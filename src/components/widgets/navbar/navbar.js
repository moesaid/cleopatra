// ============================================
// Navbar Component
// ============================================

/**
 * Initialize the navbar component
 * Handles mobile navbar toggle functionality
 */
export function initNavbar() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbar = document.getElementById('navbar');

    if (!navbarToggle || !navbar) {
        console.warn('Navbar elements not found');
        return;
    }

    navbarToggle.addEventListener('click', () => {
        navbar.classList.toggle('hidden');
        navbar.classList.toggle('fadeIn');
    });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
} else {
    initNavbar();
}

export default initNavbar;
