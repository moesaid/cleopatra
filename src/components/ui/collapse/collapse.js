// ============================================
// Collapse Component - Interactive Behavior
// ============================================

export function initCollapse() {
    document.querySelectorAll('.collapse-trigger').forEach(trigger => {
        if (trigger.hasAttribute('data-collapse-init')) return;
        trigger.setAttribute('data-collapse-init', 'true');

        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-target') ||
                trigger.getAttribute('aria-controls');
            const collapse = targetId
                ? document.getElementById(targetId)
                : trigger.nextElementSibling;

            if (!collapse) return;

            const isOpen = trigger.getAttribute('aria-expanded') === 'true';
            const parent = trigger.closest('.collapse-card, .collapse-flush');
            const group = trigger.closest('.collapse-group[data-single]');

            // Close others if in single-open group
            if (group && !isOpen) {
                group.querySelectorAll('.collapse-trigger[aria-expanded="true"]').forEach(openTrigger => {
                    if (openTrigger !== trigger) {
                        openTrigger.setAttribute('aria-expanded', 'false');
                        const openCollapse = openTrigger.nextElementSibling;
                        if (openCollapse) openCollapse.classList.remove('is-open');
                        openTrigger.closest('.collapse-card, .collapse-flush')?.classList.remove('is-open');
                    }
                });
            }

            // Toggle current
            trigger.setAttribute('aria-expanded', !isOpen);
            collapse.classList.toggle('is-open', !isOpen);
            if (parent) parent.classList.toggle('is-open', !isOpen);
        });
    });
}

export function reinitCollapse() {
    initCollapse();
}

// Auto-init
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCollapse);
    } else {
        initCollapse();
    }
}
