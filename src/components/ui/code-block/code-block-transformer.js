/**
 * Code Block Transformer
 * Automatically transforms <script type="text/plain"> elements into 
 * Stripe-style code blocks with Shiki syntax highlighting
 */

import { codeToHtml } from 'shiki';

let codeBlockCounter = 0;

// Shiki theme configuration - Always dark mode for code blocks
const SHIKI_THEME = 'github-dark-default';
const CODE_BLOCK_BG = '#0d1117'; // GitHub dark background

// Map of common language aliases to Shiki language identifiers
const LANGUAGE_MAP = {
    'js': 'javascript',
    'ts': 'typescript',
    'jsx': 'jsx',
    'tsx': 'tsx',
    'html': 'html',
    'markup': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'json': 'json',
    'bash': 'bash',
    'sh': 'bash',
    'shell': 'bash',
    'zsh': 'bash',
    'terminal': 'bash',
    'console': 'bash',
    'powershell': 'powershell',
    'cmd': 'bat',
    'python': 'python',
    'py': 'python',
    'ruby': 'ruby',
    'rb': 'ruby',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'csharp': 'csharp',
    'cs': 'csharp',
    'go': 'go',
    'rust': 'rust',
    'php': 'php',
    'sql': 'sql',
    'yaml': 'yaml',
    'yml': 'yaml',
    'xml': 'xml',
    'markdown': 'markdown',
    'md': 'markdown',
    'code': 'text',
    'text': 'text',
    'plaintext': 'text'
};

export async function initCodeBlockTransformer() {
    // Find all script tags used for code display
    const codeScripts = document.querySelectorAll('script[type="text/plain"]');

    // Process all code blocks in parallel
    const transformPromises = Array.from(codeScripts).map(async (script) => {
        // Generate unique ID
        const id = `auto-code-${++codeBlockCounter}`;

        // Extract language from class (e.g., "language-html" or "language-markup")
        const classList = script.className.split(' ');
        let language = 'text';
        classList.forEach(cls => {
            if (cls.startsWith('language-')) {
                language = cls.replace('language-', '');
            }
        });

        // Normalize language to Shiki identifier
        const shikiLang = LANGUAGE_MAP[language.toLowerCase()] || language;

        // Get the code content and dedent it (remove common leading whitespace)
        const rawContent = script.innerHTML;
        const codeContent = dedent(rawContent);

        // Create the Stripe-style code block with Shiki highlighting
        const codeBlock = await createCodeBlock(id, language, shikiLang, codeContent);

        // Replace the script tag with the code block
        script.parentNode.replaceChild(codeBlock, script);
    });

    // Wait for all transformations to complete
    await Promise.all(transformPromises);

    // Re-initialize copy functionality for new buttons
    if (typeof window.reinitCodeCopy === 'function') {
        window.reinitCodeCopy();
    }
}

/**
 * Create a Stripe-style code block element with Shiki highlighting
 */
async function createCodeBlock(id, displayLang, shikiLang, code) {
    // Get highlighted HTML from Shiki
    let highlightedCode;
    try {
        highlightedCode = await codeToHtml(code, {
            lang: shikiLang,
            theme: SHIKI_THEME,

        });
    } catch (e) {
        // Fallback to plain text if language not supported
        console.warn(`Shiki: Language "${shikiLang}" not supported, using plain text`, e);
        highlightedCode = await codeToHtml(code, {
            lang: 'text',
            theme: SHIKI_THEME,

        });
    }

    // Extract the inner content from Shiki's output (it returns <pre><code>...</code></pre>)
    // We'll use a temporary element to parse it
    const temp = document.createElement('div');
    temp.innerHTML = highlightedCode;
    const shikiPre = temp.querySelector('pre');
    const shikiCode = temp.querySelector('code');

    // Get the highlighted code HTML
    const codeHtml = shikiCode ? shikiCode.innerHTML : escapeHtml(code);

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-stripe relative rounded-lg overflow-hidden my-4 border border-slate-700/50 text-left font-mono';
    wrapper.setAttribute('data-code-block', '');
    wrapper.style.backgroundColor = CODE_BLOCK_BG;

    wrapper.innerHTML = `
        <!-- Header bar with filename and actions -->
        <div class="code-block-header flex justify-between items-center bg-slate-800/80 px-4 py-2 border-b border-slate-700/50">
            <!-- Left side: File icon and name -->
            <div class="flex items-center gap-2">
                <!-- File icon -->
                <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <!-- Language -->
                <span class="text-sm text-slate-300 font-medium">${escapeHtml(displayLang)}</span>
            </div>

            <!-- Right side: Copy button -->
            <div class="flex items-center gap-3">
                <button type="button"
                    class="copy-btn flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md
                           bg-slate-700/50 hover:bg-slate-600/70 border border-slate-600/50 hover:border-slate-500
                           text-slate-400 hover:text-slate-200 transition-all duration-200 ease-out"
                    data-code-target="code-${id}" 
                    aria-label="Copy code to clipboard">
                    <!-- Default state: Copy icon -->
                    <span class="copy-icon-default flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy</span>
                    </span>
                    <!-- Copied state -->
                    <span class="copy-icon-success hidden items-center gap-1.5 text-emerald-400">
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Copied!</span>
                    </span>
                </button>
            </div>
        </div>

        <!-- Code content -->
        <div class="code-block-content relative overflow-x-auto">
            <pre class="code-pre shiki-code !m-0 !bg-transparent"><code id="code-${id}" class="shiki-code-inner !bg-transparent text-sm">${codeHtml}</code></pre>
        </div>
    `;

    return wrapper;
}

/**
 * Remove common leading whitespace from a string (like Python's textwrap.dedent)
 */
function dedent(text) {
    // Split into lines
    const lines = text.split('\n');

    // Remove empty first and last lines (common with template strings)
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

    if (!lines.length) return '';

    // Find minimum indentation (ignoring empty lines)
    let minIndent = Infinity;
    lines.forEach(line => {
        if (line.trim()) {
            const indent = line.match(/^(\s*)/)[1].length;
            minIndent = Math.min(minIndent, indent);
        }
    });

    if (minIndent === Infinity) minIndent = 0;

    // Remove the common indentation from all lines
    return lines.map(line => line.slice(minIndent)).join('\n');
}

/**
 * Escape HTML entities
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Auto-init if DOM is ready, or wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeBlockTransformer);
} else {
    initCodeBlockTransformer();
}
