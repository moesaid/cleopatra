import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import tailwindcss from '@tailwindcss/vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readdirSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load sidebar data
const sidebarData = JSON.parse(readFileSync(resolve(__dirname, 'src/data/sidebar.json'), 'utf-8'));

// Get all HTML files for multi-page setup (recursively scans subfolders)
function getHtmlPages() {
    const pages = {
        // Landing page at root
        main: resolve(__dirname, 'src/index.html'),
    };

    const pagesDir = resolve(__dirname, 'src/pages');

    // Recursively get all HTML files
    function scanDir(dir, prefix = '') {
        const entries = readdirSync(dir, { withFileTypes: true });

        entries.forEach(entry => {
            const fullPath = resolve(dir, entry.name);

            if (entry.isDirectory()) {
                // Recursively scan subdirectories
                scanDir(fullPath, prefix + entry.name + '/');
            } else if (entry.name.endsWith('.html') && !entry.name.startsWith('_')) {
                const name = entry.name.replace('.html', '');
                // Skip root index.html as it's handled specially
                if (prefix === '' && name === 'index') return;

                // Create unique key with folder prefix (e.g., 'components_accordion')
                const key = prefix ? prefix.replace(/\//g, '_') + name : name;
                pages[key] = fullPath;
            }
        });
    }

    scanDir(pagesDir);
    return pages;
}

// Dynamically discover all partial directories
function getPartialDirectories() {
    const dirs = [
        resolve(__dirname, 'src/components/layout'),
        resolve(__dirname, 'src/components/widgets'),
        resolve(__dirname, 'src/components'),
    ];

    // Auto-discover all UI component directories and their examples
    const uiDir = resolve(__dirname, 'src/components/ui');
    dirs.push(uiDir);

    try {
        const uiComponents = readdirSync(uiDir, { withFileTypes: true });
        uiComponents.forEach(entry => {
            if (entry.isDirectory()) {
                const componentDir = resolve(uiDir, entry.name);
                dirs.push(componentDir);

                // Check for examples subdirectory
                try {
                    const subDirs = readdirSync(componentDir, { withFileTypes: true });
                    subDirs.forEach(subEntry => {
                        if (subEntry.isDirectory() && subEntry.name === 'examples') {
                            dirs.push(resolve(componentDir, 'examples'));
                        }
                    });
                } catch (e) {
                    // Ignore errors for individual component dirs
                }
            }
        });
    } catch (e) {
        console.warn('Could not scan UI components directory:', e.message);
    }

    // Auto-discover all widget subdirectories (e.g., ecommerce/, analytics/)
    const widgetsDir = resolve(__dirname, 'src/components/widgets');
    try {
        const widgetDirs = readdirSync(widgetsDir, { withFileTypes: true });
        widgetDirs.forEach(entry => {
            if (entry.isDirectory()) {
                dirs.push(resolve(widgetsDir, entry.name));
            }
        });
    } catch (e) {
        console.warn('Could not scan widgets directory:', e.message);
    }

    return dirs;
}

export default defineConfig({
    // Base path for GitHub Pages deployment
    base: process.env.GITHUB_ACTIONS ? '/cleopatra/' : '/',

    plugins: [
        handlebars({
            partialDirectory: getPartialDirectories(),
            context: {
                title: 'Cleopatra - Modern Admin Dashboard',
                sidebarLinks: sidebarData,
            },
            helpers: {
                eq: (a, b) => a === b,
            },
        }),
        tailwindcss(),

        ViteImageOptimizer({
            png: { quality: 80 },
            jpeg: { quality: 80 },
            jpg: { quality: 80 },
            webp: { quality: 80 },
        }),
    ],

    root: 'src',
    publicDir: resolve(__dirname, 'public'),

    server: {
        port: 8081,
        open: false,
        https: false,
    },

    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: getHtmlPages(),
            output: {
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split('.').at(1);
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
                        return `img/[name][extname]`;
                    }
                    if (/css/i.test(extType)) {
                        return `css/[name][extname]`;
                    }
                    return `assets/[name][extname]`;
                },
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name].js',
            },
            // Custom plugin to rename main.html to index.html
            plugins: [
                {
                    name: 'rename-main-index',
                    generateBundle(options, bundle) {
                        // Find and rename main.html to index.html
                        const mainHtml = bundle['main.html'];
                        if (mainHtml) {
                            bundle['index.html'] = mainHtml;
                            delete bundle['main.html'];
                        }
                    },
                },
            ],
        },
        cssCodeSplit: false,
        sourcemap: false,
    },

    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },

    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@components': resolve(__dirname, 'src/components'),
            '@styles': resolve(__dirname, 'src/styles'),
            '@pages': resolve(__dirname, 'src/pages'),
            '@assets': resolve(__dirname, 'src/assets'),
            // Legacy aliases for backward compatibility
            '@css': resolve(__dirname, 'src/styles'),
            '@js': resolve(__dirname, 'src/js'),
            '@img': resolve(__dirname, 'src/assets/images'),
        },
    },
});
