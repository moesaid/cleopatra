// ============================================
// Drawer Component - Interactive Behavior
// ============================================

export function initDrawer() {
    // Open triggers
    document.querySelectorAll('[data-drawer-target]').forEach(trigger => {
        if (trigger.hasAttribute('data-drawer-init')) return;
        trigger.setAttribute('data-drawer-init', 'true');

        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-drawer-target');
            openDrawer(targetId);
        });
    });

    // Close triggers
    document.querySelectorAll('[data-drawer-close]').forEach(btn => {
        if (btn.hasAttribute('data-drawer-close-init')) return;
        btn.setAttribute('data-drawer-close-init', 'true');

        btn.addEventListener('click', () => {
            const drawer = btn.closest('.drawer');
            if (drawer) closeDrawer(drawer.id);
        });
    });

    // Backdrop click
    document.querySelectorAll('.drawer-backdrop').forEach(backdrop => {
        if (backdrop.hasAttribute('data-drawer-backdrop-init')) return;
        backdrop.setAttribute('data-drawer-backdrop-init', 'true');

        backdrop.addEventListener('click', () => {
            const drawerId = backdrop.getAttribute('data-drawer-backdrop');
            if (drawerId) closeDrawer(drawerId);
        });
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openDrawer = document.querySelector('.drawer.is-open');
            if (openDrawer) closeDrawer(openDrawer.id);
        }
    });
}

export function openDrawer(id) {
    const drawer = document.getElementById(id);
    const backdrop = document.querySelector(`[data-drawer-backdrop="${id}"]`);

    if (!drawer) return;

    document.body.style.overflow = 'hidden';
    if (backdrop) backdrop.classList.add('is-open');
    drawer.classList.add('is-open');
}

export function closeDrawer(id) {
    const drawer = document.getElementById(id);
    const backdrop = document.querySelector(`[data-drawer-backdrop="${id}"]`);

    if (!drawer) return;

    drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
}

// Expose globally
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;

// Auto-init
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDrawer);
    } else {
        initDrawer();
    }
}
