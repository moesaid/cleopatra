// ============================================
// Navbar Component
// ============================================

export function initNavbar() {
    initUserDropdown();
}

// User Avatar Dropdown
function initUserDropdown() {
    const avatarBtn = document.getElementById('user-avatar-btn');
    const dropdown = document.getElementById('user-dropdown');

    if (!avatarBtn || !dropdown) return;

    // Toggle dropdown on click
    avatarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        const container = document.getElementById('user-dropdown-container');
        if (container && !container.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.add('hidden');
        }
    });
}
