// ============================================
// Tabs Component - Interactive Behavior
// ============================================

export function initTabs() {
    document.querySelectorAll('.tabs').forEach(tabs => {
        if (tabs.hasAttribute('data-tabs-init')) return;
        tabs.setAttribute('data-tabs-init', 'true');

        const triggers = tabs.querySelectorAll('.tabs-trigger');
        const panels = tabs.querySelectorAll('.tabs-panel');

        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const targetId = trigger.getAttribute('data-tab-target') ||
                    trigger.getAttribute('aria-controls');

                // Deactivate all
                triggers.forEach(t => t.classList.remove('is-active'));
                panels.forEach(p => p.classList.remove('is-active'));

                // Activate current
                trigger.classList.add('is-active');
                const panel = targetId ? document.getElementById(targetId) : null;
                if (panel) panel.classList.add('is-active');
            });
        });

        // Keyboard navigation
        tabs.addEventListener('keydown', (e) => {
            const currentTrigger = document.activeElement;
            if (!currentTrigger.classList.contains('tabs-trigger')) return;

            const triggersArray = Array.from(triggers);
            const currentIndex = triggersArray.indexOf(currentTrigger);

            let newIndex;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                newIndex = (currentIndex + 1) % triggersArray.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                newIndex = (currentIndex - 1 + triggersArray.length) % triggersArray.length;
            } else if (e.key === 'Home') {
                newIndex = 0;
            } else if (e.key === 'End') {
                newIndex = triggersArray.length - 1;
            } else {
                return;
            }

            e.preventDefault();
            triggersArray[newIndex].focus();
            triggersArray[newIndex].click();
        });
    });
}

export function reinitTabs() {
    initTabs();
}

// Auto-init
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTabs);
    } else {
        initTabs();
    }
}
