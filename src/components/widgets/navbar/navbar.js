// ============================================
// Navbar Component
// ============================================

export function initNavbar() {
    initUserDropdown();
    initThemeSwitcher();
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

// Theme Switcher
function initThemeSwitcher() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const dropdown = document.getElementById('theme-dropdown');
    const colorBtns = document.querySelectorAll('.theme-color-btn');
    const modeBtns = document.querySelectorAll('.theme-mode-btn');

    if (!toggleBtn || !dropdown) return;

    // Load saved theme on init
    loadSavedTheme();

    // Toggle dropdown
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
        // Close user dropdown if open
        const userDropdown = document.getElementById('user-dropdown');
        if (userDropdown) userDropdown.classList.add('hidden');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        const container = document.getElementById('theme-dropdown-container');
        if (container && !container.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.add('hidden');
        }
    });

    // Color theme buttons
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            setColorTheme(theme);
            updateColorButtonStyles(theme);
        });
    });

    // Mode buttons (light/dark)
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            setMode(mode);
            updateModeButtonStyles(mode);
        });
    });
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('cleopatra-theme') || 'neutral';
    const savedMode = localStorage.getItem('cleopatra-mode') || 'light';

    setColorTheme(savedTheme);
    setMode(savedMode);
    updateColorButtonStyles(savedTheme);
    updateModeButtonStyles(savedMode);
}

function setColorTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cleopatra-theme', theme);
}

function setMode(mode) {
    if (mode === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('cleopatra-mode', mode);
}

function updateColorButtonStyles(activeTheme) {
    const colorBtns = document.querySelectorAll('.theme-color-btn');
    colorBtns.forEach(btn => {
        if (btn.dataset.theme === activeTheme) {
            btn.classList.remove('ring-transparent');
            btn.classList.add('ring-gray-900');
        } else {
            btn.classList.remove('ring-gray-900');
            btn.classList.add('ring-transparent');
        }
    });
}

function updateModeButtonStyles(activeMode) {
    const modeBtns = document.querySelectorAll('.theme-mode-btn');
    modeBtns.forEach(btn => {
        if (btn.dataset.mode === activeMode) {
            btn.classList.add('bg-gray-100', 'text-gray-900', 'border-gray-300');
            btn.classList.remove('text-gray-600', 'border-gray-200');
        } else {
            btn.classList.remove('bg-gray-100', 'text-gray-900', 'border-gray-300');
            btn.classList.add('text-gray-600', 'border-gray-200');
        }
    });
}
