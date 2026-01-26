// ============================================
// Accordion Component - Interactive Behavior
// ============================================

export function initAccordion() {
    document.querySelectorAll('.accordion').forEach(accordion => {
        // Skip if already initialized
        if (accordion.hasAttribute('data-accordion-init')) return;
        accordion.setAttribute('data-accordion-init', 'true');

        const allowMultiple = accordion.hasAttribute('data-allow-multiple');
        const triggers = accordion.querySelectorAll('.accordion-trigger');

        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const item = trigger.closest('.accordion-item');
                const content = item.querySelector('.accordion-content');
                const isOpen = trigger.getAttribute('aria-expanded') === 'true';

                // Close others if not allowing multiple
                if (!allowMultiple && !isOpen) {
                    accordion.querySelectorAll('.accordion-trigger[aria-expanded="true"]').forEach(openTrigger => {
                        if (openTrigger !== trigger) {
                            openTrigger.setAttribute('aria-expanded', 'false');
                            openTrigger.closest('.accordion-item')
                                .querySelector('.accordion-content')
                                .classList.remove('is-open');
                        }
                    });
                }

                // Toggle current
                trigger.setAttribute('aria-expanded', !isOpen);
                content.classList.toggle('is-open', !isOpen);
            });
        });
    });
}

// Re-initialize for SPA navigation
export function reinitAccordion() {
    initAccordion();
}

// Auto-init
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccordion);
    } else {
        initAccordion();
    }
}
