// ============================================
// View Transitions API Support
// ============================================

export function initViewTransitions() {
    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
        console.log('View Transitions API not supported');
        return;
    }

    // Intercept same-origin navigation
    window.addEventListener('click', (e) => {
        const link = e.target.closest('a');

        if (!link) return;
        if (link.origin !== location.origin) return;
        if (link.target === '_blank') return;
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;

        e.preventDefault();

        // Perform view transition
        document.startViewTransition(() => {
            window.location.href = link.href;
        });
    });

    console.log('✨ View Transitions enabled');
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initViewTransitions);
} else {
    initViewTransitions();
}
