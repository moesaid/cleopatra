// ============================================
// Sidebar Component - Data-Driven Navigation
// Theme-Aware Colors
// ============================================

// Menu Data Structure
const menuData = [
    {
        type: 'menu',
        id: 'dashboards',
        label: 'Dashboards',
        icon: 'ri-layout-grid-line',
        children: [
            { id: 'analytics-dashboard', label: 'Analytics Dashboard', href: '/pages/' },
            { id: 'mission-control', label: 'Mission Control', href: '/pages/index-mission-control.html' },
            { id: 'index-e-commerce', label: 'eCommerce', href: '/pages/index-e-commerce.html' },
            { id: 'index-crypto', label: 'Crypto Dashboard', href: '/pages/index-crypto.html' },
        ]
    },
    {
        type: 'category',
        label: 'APPS'
    },
    {
        type: 'link',
        id: 'email',
        label: 'Email',
        icon: 'ri-mail-line',
        href: '/pages/apps/email.html'
    },
    {
        type: 'link',
        id: 'calendar',
        label: 'Calendar',
        icon: 'ri-calendar-line',
        href: '/pages/apps/calendar.html'
    },
    {
        type: 'link',
        id: 'ai-chat',
        label: 'AI Chat',
        icon: 'ri-chat-ai-line',
        href: '/pages/apps/ai-chat.html'
    },
    {
        type: 'link',
        id: 'user-management',
        label: 'User Management',
        icon: 'ri-user-settings-line',
        href: '/pages/apps/user-management.html'
    },
    {
        type: 'link',
        id: 'todo',
        label: 'Todo',
        icon: 'ri-checkbox-line',
        href: '/pages/apps/todo.html'
    },
    {
        type: 'link',
        id: 'retail-store',
        label: 'Retail Store',
        icon: 'ri-store-2-line',
        href: '/pages/apps/retail-store.html'
    },
    {
        type: 'link',
        id: 'crm',
        label: 'CRM',
        icon: 'ri-contacts-book-line',
        href: '/pages/apps/crm.html'
    },
    {
        type: 'link',
        id: 'inventory',
        label: 'Inventory',
        icon: 'ri-box-3-line',
        href: '/pages/apps/inventory.html'
    },
    {
        type: 'link',
        id: 'real-estate',
        label: 'Real Estate',
        icon: 'ri-home-4-line',
        href: '/pages/apps/real-estate.html'
    },
    {
        type: 'category',
        label: 'EXTRA'
    },
    {
        type: 'link',
        id: 'blank-page',
        label: 'Blank Page',
        icon: 'ri-file-line',
        href: '/pages/extra/blank.html'
    },
    {
        type: 'category',
        label: 'UI ELEMENTS'
    },
    {
        type: 'menu',
        id: 'components',
        label: 'Components',
        icon: 'ri-stack-line',
        children: [
            { id: 'accordion', label: 'Accordion', href: '/pages/components/accordion.html' },
            { id: 'alerts', label: 'Alerts', href: '/pages/components/alert.html' },
            { id: 'avatar', label: 'Avatar', href: '/pages/components/avatar.html' },
            { id: 'badges', label: 'Badges', href: '/pages/components/badges.html' },
            { id: 'breadcrumb', label: 'Breadcrumb', href: '/pages/components/breadcrumb.html' },
            { id: 'buttons', label: 'Buttons', href: '/pages/components/buttons.html' },
            { id: 'cards', label: 'Cards', href: '/pages/components/cards.html' },
            { id: 'checkbox', label: 'Checkbox', href: '/pages/components/checkbox.html' },
            { id: 'collapse', label: 'Collapse', href: '/pages/components/collapse.html' },
            { id: 'dropdowns', label: 'Dropdowns', href: '/pages/components/dropdowns.html' },
            { id: 'pagination', label: 'Pagination', href: '/pages/components/pagination.html' },
            { id: 'progress', label: 'Progress', href: '/pages/components/progress.html' },
            { id: 'skeleton', label: 'Skeleton', href: '/pages/components/skeleton.html' },
            { id: 'tabs', label: 'Tabs', href: '/pages/components/tabs.html' },
            { id: 'toast', label: 'Toast', href: '/pages/components/toast.html' }
        ]
    },
    {
        type: 'menu',
        id: 'forms',
        label: 'Forms',
        icon: 'ri-file-list-3-line',
        children: [
            { id: 'form-elements', label: 'Form Elements', href: '/pages/forms/forms.html' },
            { id: 'form-validation', label: 'Validation', href: '/pages/forms/validation.html' }
        ]
    },
    {
        type: 'menu',
        id: 'content',
        label: 'Content',
        icon: 'ri-text',
        children: [
            { id: 'typography', label: 'Typography', href: '/pages/content/typography.html' },
            { id: 'tables', label: 'Tables', href: '/pages/content/tables.html' },
            { id: 'code-blocks', label: 'Code Blocks', href: '/pages/content/code-blocks.html' }
        ]
    },
    {
        type: 'menu',
        id: 'overlays',
        label: 'Overlays',
        icon: 'ri-window-line',
        children: [
            { id: 'modal', label: 'Modal', href: '/pages/overlays/modal.html' },
            { id: 'tooltip', label: 'Tooltip', href: '/pages/overlays/tooltip.html' }
        ]
    },

    {
        type: 'category',
        label: 'SETTINGS'
    },
    {
        type: 'link',
        id: 'theme',
        label: 'Theme',
        icon: 'ri-palette-line',
        href: '/pages/settings/theme.html'
    }
];

// Sidebar State
let isCollapsed = false;
let isMobileOpen = false;

// Initialize Sidebar
export function initSidebar() {
    const sidebarContainer = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (!sidebarContainer) return;

    // Render menu
    renderMenu(sidebarContainer);

    // Desktop toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebarCollapse);
    }

    // Mobile toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileSidebar);
    }

    // Overlay click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    // Handle resize
    window.addEventListener('resize', handleResize);

    // Set active based on current URL
    setTimeout(() => setActiveByUrl(), 0);
}

// Check if URL matches href
function isUrlMatch(href) {
    const currentPath = window.location.pathname;
    return href === currentPath ||
        (currentPath === '/pages/' && href === '/pages/') ||
        (currentPath === '/pages/index.html' && href === '/pages/') ||
        (currentPath.endsWith('/index.html') && href === currentPath.replace('/index.html', '/')) ||
        (href.endsWith('/') && currentPath === href + 'index.html');
}

// Render Menu from Data
function renderMenu(container) {
    let html = '<nav class="sidebar-nav py-5">';

    menuData.forEach(item => {
        if (item.type === 'category') {
            html += renderCategory(item);
        } else if (item.type === 'menu') {
            html += renderMenuItem(item);
        } else if (item.type === 'link') {
            html += renderLink(item);
        }
    });

    html += '</nav>';
    container.innerHTML = html;
    attachMenuListeners(container);
}

// Render Category Header - THEME-AWARE
function renderCategory(item) {
    return `
        <div class="category-label px-6 py-2 text-[11px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider mt-4">
            <span class="category-text">${item.label}</span>
        </div>
    `;
}

// Render Menu Item with Children - THEME-AWARE
function renderMenuItem(item) {
    const hasActiveChild = item.children?.some(child => isUrlMatch(child.href));

    let childrenHtml = '';
    if (item.children) {
        childrenHtml = item.children.map(child => {
            const isActive = isUrlMatch(child.href);
            return `
                <a href="${child.href}" 
                   data-id="${child.id}"
                   class="submenu-link flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                          active:scale-[0.98] active:opacity-80
                          ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'}">
                    ${isActive ? '<span class="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>' : ''}
                    <span>${child.label}</span>
                </a>
            `;
        }).join('');
    }

    // Popover links for hover - THEME-AWARE
    const popoverLinks = item.children?.map(child => `
        <a href="${child.href}" class="block px-4 py-2 text-sm text-popover-foreground/70 hover:bg-muted hover:text-popover-foreground transition-colors focus:outline-none active:opacity-80">${child.label}</a>
    `).join('') || '';

    return `
        <div class="menu-item relative ${hasActiveChild ? 'is-open' : ''}" data-id="${item.id}">
            <button class="menu-toggle w-full h-11 flex items-center px-6 text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 group">
                <i class="${item.icon} text-[18px] text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors w-5 flex-shrink-0"></i>
                <span class="menu-text flex-1 text-left text-sm font-medium ml-3 truncate">${item.label}</span>
                <i class="menu-arrow ri-add-line text-sidebar-foreground/50 transition-transform duration-300 ${hasActiveChild ? 'rotate-45' : ''}"></i>
            </button>
            <div class="submenu transition-all duration-300 overflow-hidden ${hasActiveChild ? 'max-h-[500px]' : 'max-h-0'}">
                <div class="py-1 pl-14 pr-4">
                    ${childrenHtml}
                </div>
            </div>
            <!-- Hover Popover - THEME-AWARE -->
            <div class="menu-popover absolute left-full top-0 ml-1 bg-popover text-popover-foreground rounded-lg shadow-xl border border-border py-2 min-w-[200px] z-[100] opacity-0 invisible transition-all duration-200">
                <div class="px-4 py-2 text-sm font-semibold border-b border-border">${item.label}</div>
                ${popoverLinks}
            </div>
        </div>
    `;
}

// Render Simple Link - THEME-AWARE
function renderLink(item) {
    const isActive = isUrlMatch(item.href);
    const isDisabled = item.disabled;

    return `
        <div class="menu-link relative" data-id="${item.id}">
            <a href="${isDisabled ? '#' : item.href || '#'}" 
               class="w-full h-11 flex items-center px-6 transition-all duration-200 group
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset
                      active:scale-[0.99] active:opacity-80
                      ${isActive ? 'bg-primary/10 text-primary' : isDisabled ? 'text-sidebar-foreground/30 cursor-not-allowed' : 'text-sidebar-foreground hover:bg-sidebar-accent'}"
               ${isDisabled ? 'onclick="return false;"' : ''}>
                <i class="${item.icon} text-[18px] ${isActive ? 'text-primary' : isDisabled ? 'text-sidebar-foreground/20' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground'} w-5 flex-shrink-0 transition-colors"></i>
                <span class="menu-text flex-1 text-left text-sm font-medium ml-3 truncate">${item.label}</span>
                ${item.status ? `<span class="status-badge text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-medium">${item.status}</span>` : ''}
            </a>
            <!-- Hover Tooltip - THEME-AWARE -->
            <div class="menu-tooltip absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-popover text-popover-foreground text-xs rounded-lg border border-border whitespace-nowrap z-[100] opacity-0 invisible transition-all duration-200">
                ${item.label}
            </div>
        </div>
    `;
}

// Attach Event Listeners
function attachMenuListeners(container) {
    // Menu toggles
    container.querySelectorAll('.menu-toggle').forEach(toggle => {
        toggle.addEventListener('click', handleMenuToggle);
    });

    // Links for mobile close
    container.querySelectorAll('.submenu-link, .menu-popover a, .menu-link a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) closeMobileSidebar();
        });
    });
}

// Handle Menu Toggle (Accordion)
function handleMenuToggle(e) {
    const menuItem = e.currentTarget.closest('.menu-item');
    const submenu = menuItem.querySelector('.submenu');
    const arrow = menuItem.querySelector('.menu-arrow');
    const isOpen = menuItem.classList.contains('is-open');
    const container = document.getElementById('sidebar');

    // Close all other menus (accordion)
    container.querySelectorAll('.menu-item.is-open').forEach(openItem => {
        if (openItem !== menuItem) {
            openItem.classList.remove('is-open');
            const sub = openItem.querySelector('.submenu');
            const arr = openItem.querySelector('.menu-arrow');
            if (sub) sub.style.maxHeight = '0';
            if (arr) arr.classList.remove('rotate-45');
        }
    });

    // Toggle current
    if (isOpen) {
        menuItem.classList.remove('is-open');
        submenu.style.maxHeight = '0';
        arrow.classList.remove('rotate-45');
    } else {
        menuItem.classList.add('is-open');
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
        arrow.classList.add('rotate-45');
    }
}

// Set Active by Current URL - THEME-AWARE
function setActiveByUrl() {
    const container = document.getElementById('sidebar');
    if (!container) return;

    // Clear all active states - remove old hardcoded colors, apply theme colors
    container.querySelectorAll('.submenu-link, .menu-link a').forEach(link => {
        link.classList.remove('bg-primary/10', 'text-primary', 'font-medium');
        link.classList.add('text-sidebar-foreground/70', 'hover:bg-sidebar-accent', 'hover:text-sidebar-foreground');
        const bullet = link.querySelector('.w-1\\.5');
        if (bullet) bullet.remove();
    });

    // Set active based on URL with theme colors
    let activeLink = null;
    container.querySelectorAll('.submenu-link, .menu-link a').forEach(link => {
        if (isUrlMatch(link.getAttribute('href'))) {
            link.classList.remove('text-sidebar-foreground/70', 'hover:bg-sidebar-accent', 'hover:text-sidebar-foreground');
            link.classList.add('bg-primary/10', 'text-primary', 'font-medium');

            if (!link.querySelector('.w-1\\.5') && link.classList.contains('submenu-link')) {
                const bullet = document.createElement('span');
                bullet.className = 'w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0';
                link.insertBefore(bullet, link.firstChild);
            }

            // Open parent menu
            const menuItem = link.closest('.menu-item');
            if (menuItem && !menuItem.classList.contains('is-open')) {
                menuItem.querySelector('.menu-toggle')?.click();
            }

            activeLink = link;
        }
    });

    // Scroll active link into view (centered in sidebar)
    if (activeLink) {
        setTimeout(() => {
            activeLink.scrollIntoView({ behavior: 'instant', block: 'center' });
        }, 100);
    }
}

// Toggle Sidebar Collapse (Desktop)
function toggleSidebarCollapse() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    isCollapsed = !isCollapsed;
    sidebar.classList.toggle('is-collapsed', isCollapsed);

    if (isCollapsed) {
        sidebar.classList.remove('w-[260px]');
        sidebar.classList.add('w-[72px]');
        content?.classList.remove('lg:ml-[260px]');
        content?.classList.add('lg:ml-[72px]');
    } else {
        sidebar.classList.remove('w-[72px]');
        sidebar.classList.add('w-[260px]');
        content?.classList.remove('lg:ml-[72px]');
        content?.classList.add('lg:ml-[260px]');
    }
}

// Toggle Mobile Sidebar
function toggleMobileSidebar() {
    isMobileOpen = !isMobileOpen;
    updateMobileSidebar();
}

// Close Mobile Sidebar
function closeMobileSidebar() {
    isMobileOpen = false;
    updateMobileSidebar();
}

// Update Mobile Sidebar State
function updateMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (isMobileOpen) {
        sidebar.classList.remove('-translate-x-full');
        overlay?.classList.remove('hidden', 'opacity-0');
        overlay?.classList.add('opacity-100');
        document.body.classList.add('overflow-hidden');
    } else {
        sidebar.classList.add('-translate-x-full');
        overlay?.classList.add('opacity-0');
        setTimeout(() => overlay?.classList.add('hidden'), 200);
        document.body.classList.remove('overflow-hidden');
    }
}

// Handle Resize
function handleResize() {
    if (window.innerWidth >= 1024) {
        closeMobileSidebar();
        document.body.classList.remove('overflow-hidden');
    }
}

// Auto-init
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        initSidebar();
    }
}
