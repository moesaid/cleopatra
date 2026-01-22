// ============================================
// Dropdown Component - Interactive Behavior
// ============================================

export function initDropdown() {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        if (dropdown.hasAttribute('data-dropdown-init')) return;
        dropdown.setAttribute('data-dropdown-init', 'true');

        const trigger = dropdown.querySelector('.dropdown-trigger, .menu-btn, [data-dropdown-trigger]');
        const menu = dropdown.querySelector('.dropdown-menu, .menu');

        if (!trigger || !menu) return;

        // Toggle on click
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = menu.classList.contains('is-open');

            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu.is-open, .dropdown .menu:not(.hidden)').forEach(m => {
                if (m !== menu) {
                    m.classList.remove('is-open');
                    m.classList.add('hidden');
                }
            });

            // Toggle current menu
            if (menu.classList.contains('dropdown-menu')) {
                menu.classList.toggle('is-open');
            } else {
                menu.classList.toggle('hidden');
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu.is-open').forEach(menu => {
                menu.classList.remove('is-open');
            });
            document.querySelectorAll('.dropdown .menu:not(.hidden)').forEach(menu => {
                menu.classList.add('hidden');
            });
        }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown-menu.is-open').forEach(menu => {
                menu.classList.remove('is-open');
            });
            document.querySelectorAll('.dropdown .menu:not(.hidden)').forEach(menu => {
                menu.classList.add('hidden');
            });
        }
    });
}

export function reinitDropdown() {
    initDropdown();
}

// Auto-init
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDropdown);
    } else {
        initDropdown();
    }
}

// Export legacy toggle function for inline onclick
window.toggleDropdown = function (id) {
    const menu = document.getElementById(id);
    if (!menu) return;

    // Close all other menus
    document.querySelectorAll('[id$="-menu"], .dropdown-menu.is-open').forEach(m => {
        if (m.id !== id && m !== menu) {
            m.classList.add('hidden');
            m.classList.remove('is-open');
        }
    });

    // Toggle current
    if (menu.classList.contains('dropdown-menu')) {
        menu.classList.toggle('is-open');
    } else {
        menu.classList.toggle('hidden');
    }
};
