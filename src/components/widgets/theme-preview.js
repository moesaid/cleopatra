/**
 * Theme Preview Component
 * Handles theme preview grid interactions on the theme settings page
 */

export function initThemePreview() {
    const previewButtons = document.querySelectorAll('.theme-preview-btn');

    // Theme preview grid
    if (previewButtons.length) {
        // Apply current theme indicator
        function updateActiveIndicator() {
            const currentTheme = localStorage.getItem('cleopatra-theme') || 'neutral';
            previewButtons.forEach(btn => {
                if (btn.dataset.theme === currentTheme) {
                    btn.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
                    btn.classList.remove('border-border');
                } else {
                    btn.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
                    btn.classList.add('border-border');
                }
            });
        }

        // Handle theme preview clicks
        previewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.theme;
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('cleopatra-theme', theme);
                updateActiveIndicator();

                // Also update navbar buttons if they exist
                const navButtons = document.querySelectorAll('.theme-color-btn');
                navButtons.forEach(navBtn => {
                    if (navBtn.dataset.theme === theme) {
                        navBtn.classList.remove('ring-transparent');
                        navBtn.classList.add('ring-gray-900');
                    } else {
                        navBtn.classList.remove('ring-gray-900');
                        navBtn.classList.add('ring-transparent');
                    }
                });
            });
        });

        updateActiveIndicator();
    }

    // Dark mode toggle buttons on theme page
    const lightModeBtn = document.getElementById('light-mode-btn');
    const darkModeBtn = document.getElementById('dark-mode-btn');

    if (lightModeBtn) {
        lightModeBtn.addEventListener('click', () => {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('cleopatra-mode', 'light');
        });
    }

    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            document.documentElement.classList.add('dark');
            localStorage.setItem('cleopatra-mode', 'dark');
        });
    }
}

// Auto-init on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemePreview);
} else {
    initThemePreview();
}
