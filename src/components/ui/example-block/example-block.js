/**
 * Example Block Component
 * Handles tab switching, RTL toggle, dark mode toggle, and copy functionality
 */

export function initExampleBlocks() {
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
}
