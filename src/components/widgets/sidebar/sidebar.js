// ============================================
// Sidebar Module
// ============================================

export function initSidebar() {
    const btn = document.getElementById('sliderBtn');
    const sideBar = document.getElementById('mobileSidebar');
    const sideBarHideBtn = document.getElementById('sideBarHideBtn');
    const backdrop = document.getElementById('sidebarBackdrop');

    if (!btn || !sideBar || !sideBarHideBtn) {
        console.warn('Sidebar elements not found');
        return;
    }

    // Show sidebar
    btn.addEventListener('click', () => {
        sideBar.classList.add('open', 'opening');
        sideBar.classList.remove('closing');
        if (backdrop) {
            backdrop.classList.add('active');
        }

        // Remove opening class after animation
        setTimeout(() => {
            sideBar.classList.remove('opening');
        }, 300);
    });

    // Hide sidebar
    const hideSidebar = () => {
        sideBar.classList.add('closing');
        sideBar.classList.remove('open', 'opening');
        if (backdrop) {
            backdrop.classList.remove('active');
        }

        // Remove closing class after animation
        setTimeout(() => {
            sideBar.classList.remove('closing');
        }, 300);
    };

    sideBarHideBtn.addEventListener('click', hideSidebar);

    // Close sidebar when clicking backdrop
    if (backdrop) {
        backdrop.addEventListener('click', hideSidebar);
    }

    // Close sidebar on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sideBar.classList.contains('open')) {
            hideSidebar();
        }
    });
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
} else {
    initSidebar();
}
