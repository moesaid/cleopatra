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

// Get all HTML files for multi-page setup
function getHtmlPages() {
    const pages = {
        // Main entry point at root
        main: resolve(__dirname, 'src/pages/index.html'),
    };

    // Add pages from src/pages (excluding index.html to avoid duplicate)
    const pagesDir = resolve(__dirname, 'src/pages');
    const files = readdirSync(pagesDir);

    files.forEach(file => {
        if (file.endsWith('.html') && !file.startsWith('_')) {
            const name = file.replace('.html', '');
            // Skip index.html as it's now at root
            if (name !== 'index') {
                pages[name] = resolve(pagesDir, file);
            }
        }
    });

    return pages;
}

export default defineConfig({
    plugins: [
        handlebars({
            partialDirectory: [
                resolve(__dirname, 'src/components/layout'),
                resolve(__dirname, 'src/components/ui'),
                resolve(__dirname, 'src/components/widgets'),
                resolve(__dirname, 'src/components'),
            ],
            context: {
                title: 'Cleopatra - Modern Admin Dashboard',
                sidebarLinks: sidebarData,
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
    publicDir: resolve(__dirname, 'src/assets'),

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
