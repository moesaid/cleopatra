/**
 * Example Block Component
 * Handles tab switching, RTL toggle, dark mode toggle, and copy functionality
 * Uses Shiki for syntax highlighting
 */

import { codeToHtml } from 'shiki';

// Shiki configuration
const SHIKI_THEME = 'github-dark';

export async function initExampleBlocks() {
    // Tab switching
    document.querySelectorAll('.example-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetId = tab.dataset.target;
            const tabType = tab.dataset.tab;
            const block = tab.closest('.example-block');

            if (!block) return;

            // Update tab states
            block.querySelectorAll('.example-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update panel visibility
            block.querySelectorAll('.example-panel').forEach(panel => {
                panel.classList.remove('active');
                if (panel.dataset.panel === tabType) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // RTL Toggle
    document.querySelectorAll('.rtl-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const block = btn.closest('.example-block');
            const previewContent = block?.querySelector('.example-preview-content');

            if (previewContent) {
                previewContent.classList.toggle('rtl');
                btn.classList.toggle('active');
            }
        });
    });

    // Dark Mode Toggle (preview only)
    document.querySelectorAll('.darkmode-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const block = btn.closest('.example-block');
            const previewContent = block?.querySelector('.example-preview-content');

            if (previewContent) {
                previewContent.classList.toggle('dark-preview');
                btn.classList.toggle('active');

                // Toggle icon
                const icon = btn.querySelector('i');
                if (icon) {
                    if (previewContent.classList.contains('dark-preview')) {
                        icon.classList.remove('ri-moon-line');
                        icon.classList.add('ri-sun-line');
                    } else {
                        icon.classList.remove('ri-sun-line');
                        icon.classList.add('ri-moon-line');
                    }
                }
            }
        });
    });

    // Copy Button
    document.querySelectorAll('.example-action-btn.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const codeId = btn.dataset.codeTarget;
            const codeElement = document.getElementById(codeId);

            if (!codeElement) return;

            try {
                await navigator.clipboard.writeText(codeElement.textContent || '');

                // Show success state
                btn.classList.add('copied');
                const defaultIcon = btn.querySelector('.copy-icon-default');
                const successIcon = btn.querySelector('.copy-icon-success');

                if (defaultIcon) defaultIcon.classList.add('hidden');
                if (successIcon) successIcon.classList.remove('hidden');

                // Reset after 2 seconds
                setTimeout(() => {
                    btn.classList.remove('copied');
                    if (defaultIcon) defaultIcon.classList.remove('hidden');
                    if (successIcon) successIcon.classList.add('hidden');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });

    // Populate code blocks from preview content and apply Shiki highlighting
    const highlightPromises = Array.from(document.querySelectorAll('.example-block')).map(async block => {
        const codeElement = block.querySelector('.example-code code');
        const previewContent = block.querySelector('.example-preview-content');

        // Check if this code block should be populated from preview
        if (codeElement && previewContent && codeElement.hasAttribute('data-from-preview')) {
            // Extract innerHTML from preview and format it
            const rawHtml = previewContent.innerHTML.trim();
            const formatted = formatHtml(rawHtml);

            // Apply Shiki highlighting
            try {
                const highlightedHtml = await codeToHtml(formatted, {
                    lang: 'html',
                    theme: SHIKI_THEME
                });

                // Extract just the code content from Shiki's output
                const temp = document.createElement('div');
                temp.innerHTML = highlightedHtml;
                const shikiCode = temp.querySelector('code');

                if (shikiCode) {
                    codeElement.innerHTML = shikiCode.innerHTML;
                } else {
                    codeElement.textContent = formatted;
                }
            } catch (e) {
                // Fallback to plain text
                console.warn('Shiki highlighting failed:', e);
                codeElement.textContent = formatted;
            }
        }
    });

    await Promise.all(highlightPromises);
}

/**
 * Simple HTML formatter for display in code blocks
 */
function formatHtml(html) {
    // Remove excess whitespace between tags
    let formatted = html
        .replace(/>\s+</g, '>\n<')
        .replace(/\n\s*\n/g, '\n');

    // Add proper indentation
    const lines = formatted.split('\n');
    let indent = 0;
    const indentSize = 4;

    return lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';

        // Decrease indent for closing tags
        if (trimmed.startsWith('</') || trimmed.startsWith('-->')) {
            indent = Math.max(0, indent - indentSize);
        }

        const result = ' '.repeat(indent) + trimmed;

        // Increase indent for opening tags (not self-closing or void)
        if (trimmed.startsWith('<') && !trimmed.startsWith('</') &&
            !trimmed.startsWith('<!') && !trimmed.endsWith('/>') &&
            !/(br|hr|img|input|meta|link)[\s>]/i.test(trimmed)) {
            // Check if it's not a self-contained tag like <span>text</span>
            if (!trimmed.includes('</')) {
                indent += indentSize;
            }
        }

        return result;
    }).filter(line => line.trim()).join('\n');
}
