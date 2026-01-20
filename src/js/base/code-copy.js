/**
 * Stripe-style Code Copy Functionality
 * Provides polished copy-to-clipboard with animated feedback
 */

export function initCodeCopy() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        // Prevent duplicate listeners
        if (btn.hasAttribute('data-copy-initialized')) return;
        btn.setAttribute('data-copy-initialized', 'true');

        btn.addEventListener('click', async (e) => {
            e.preventDefault();

            const targetId = btn.getAttribute('data-code-target');
            const codeElement = document.getElementById(targetId);

            if (!codeElement) {
                console.warn(`Code element not found: ${targetId}`);
                return;
            }

            // Get the code text, preserving formatting
            const codeText = codeElement.innerText || codeElement.textContent;

            try {
                await navigator.clipboard.writeText(codeText);
                showCopiedFeedback(btn);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showErrorFeedback(btn);
            }
        });
    });
}

/**
 * Show animated "Copied!" feedback
 */
function showCopiedFeedback(btn) {
    // Add copied class for CSS-based styling
    btn.classList.add('copied');

    // Button press animation
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = '', 100);

    // Reset after delay
    setTimeout(() => {
        btn.classList.remove('copied');
    }, 2000);
}

/**
 * Show error feedback when copy fails
 */
function showErrorFeedback(btn) {
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span class="flex items-center gap-1.5 text-red-400"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>Failed</span>';

    setTimeout(() => {
        btn.innerHTML = originalHTML;
    }, 2000);
}

/**
 * Re-initialize for dynamically added content
 */
export function reinitCodeCopy() {
    initCodeCopy();
}

// Auto-init if DOM is ready, or wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeCopy);
} else {
    initCodeCopy();
}
