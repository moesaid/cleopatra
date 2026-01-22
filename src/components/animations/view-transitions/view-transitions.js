// ============================================
// View Transitions API Support
// ============================================

export function initViewTransitions() {
    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
        console.log('View Transitions API not supported - using fallback fade');
        return;
    }

    // Add CSS for smooth fade transition
    const style = document.createElement('style');
    style.textContent = `
        ::view-transition-old(root),
        ::view-transition-new(root) {
            animation-duration: 0.3s;
        }
        
        ::view-transition-old(root) {
            animation-name: fade-out;
        }
        
        ::view-transition-new(root) {
            animation-name: fade-in;
        }
        
        @keyframes fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Intercept same-origin navigation
    window.addEventListener('click', (e) => {
        const link = e.target.closest('a');

        if (!link) return;
        if (link.origin !== location.origin) return;
        if (link.target === '_blank') return;
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;

        e.preventDefault();

        // Perform view transition with fade
        document.startViewTransition(() => {
            window.location.href = link.href;
        });
    });

    console.log('✨ View Transitions enabled (fade mode)');
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initViewTransitions);
} else {
    initViewTransitions();
}
