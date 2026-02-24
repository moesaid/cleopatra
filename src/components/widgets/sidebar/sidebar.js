// ============================================
// Sidebar Component - Data-Driven Navigation
// Theme-Aware Colors with Lucide Icons
// ============================================

import { getLucideIcon } from '../../../data/lucide-icons.js';

// Resolve href with Vite base path (e.g. /cleopatra/ on GitHub Pages)
function resolveHref(path) {
    const base = import.meta.env.BASE_URL || '/';
    // Remove leading slash from path since base already ends with one
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return base + cleanPath;
}

// Menu Data Structure with Lucide icon names
const menuData = [
    {
        type: 'menu',
        id: 'dashboards',
        label: 'Dashboards',
        icon: 'layout-dashboard',
        children: [
            { id: 'analytics-dashboard', label: 'Analytics Dashboard', href: '/pages/', icon: 'bar-chart-3' },
            { id: 'mission-control', label: 'Mission Control', href: '/pages/index-mission-control.html', icon: 'gauge' },
            { id: 'index-e-commerce', label: 'eCommerce', href: '/pages/index-e-commerce.html', icon: 'shopping-cart' },
            { id: 'index-crypto', label: 'Crypto Dashboard', href: '/pages/index-crypto.html', icon: 'bitcoin' },
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
        icon: 'mail',
        href: '/pages/apps/email.html'
    },
    {
        type: 'link',
        id: 'calendar',
        label: 'Calendar',
        icon: 'calendar',
        href: '/pages/apps/calendar.html'
    },
    {
        type: 'link',
        id: 'ai-chat',
        label: 'AI Chat',
        icon: 'bot',
        href: '/pages/apps/ai-chat.html'
    },
    {
        type: 'link',
        id: 'user-management',
        label: 'User Management',
        icon: 'users',
        href: '/pages/apps/user-management.html'
    },
    {
        type: 'link',
        id: 'todo',
        label: 'Todo',
        icon: 'check-square',
        href: '/pages/apps/todo.html'
    },
    {
        type: 'link',
        id: 'retail-store',
        label: 'Retail Store',
        icon: 'store',
        href: '/pages/apps/retail-store.html'
    },
    {
        type: 'link',
        id: 'crm',
        label: 'CRM',
        icon: 'contact',
        href: '/pages/apps/crm.html'
    },
    {
        type: 'link',
        id: 'inventory',
        label: 'Inventory',
        icon: 'package',
        href: '/pages/apps/inventory.html'
    },
    {
        type: 'link',
        id: 'real-estate',
        label: 'Real Estate',
        icon: 'home',
        href: '/pages/apps/real-estate.html'
    },
    {
        type: 'category',
        label: 'EXTRA'
    },
    {
        type: 'menu',
        id: 'error-pages',
        label: 'Error Pages',
        icon: 'alert-triangle',
        children: [
            { id: 'error-404', label: '404 - Not Found', href: '/pages/extra/404.html', icon: 'file-x' },
            { id: 'error-500', label: '500 - Server Error', href: '/pages/extra/500.html', icon: 'server-crash' },
            { id: 'error-403', label: '403 - Forbidden', href: '/pages/extra/403.html', icon: 'lock' },
            { id: 'maintenance', label: 'Maintenance', href: '/pages/extra/maintenance.html', icon: 'wrench' }
        ]
    },
    {
        type: 'menu',
        id: 'auth-pages',
        label: 'Authentication',
        icon: 'shield',
        children: [
            { id: 'login', label: 'Login', href: '/pages/extra/login.html', icon: 'log-in' },
            { id: 'register', label: 'Register', href: '/pages/extra/register.html', icon: 'user-plus' },
            { id: 'forgot-password', label: 'Forgot Password', href: '/pages/extra/forgot-password.html', icon: 'key' }
        ]
    },
    {
        type: 'menu',
        id: 'utility-pages',
        label: 'Utility Pages',
        icon: 'file-text',
        children: [
            { id: 'blank-page', label: 'Blank Page', href: '/pages/extra/blank.html', icon: 'file' },
            { id: 'coming-soon', label: 'Coming Soon', href: '/pages/extra/coming-soon.html', icon: 'clock' },
            { id: 'empty-state', label: 'Empty State', href: '/pages/extra/empty.html', icon: 'inbox' },
            { id: 'success', label: 'Success', href: '/pages/extra/success.html', icon: 'check-circle' }
        ]
    },
    {
        type: 'category',
        label: 'UI ELEMENTS'
    },
    {
        type: 'menu',
        id: 'components',
        label: 'Components',
        icon: 'layers',
        children: [
            { id: 'accordion', label: 'Accordion', href: '/pages/components/accordion.html', icon: 'chevrons-up-down' },
            { id: 'alerts', label: 'Alerts', href: '/pages/components/alert.html', icon: 'alert-triangle' },
            { id: 'avatar', label: 'Avatar', href: '/pages/components/avatar.html', icon: 'user' },
            { id: 'badges', label: 'Badges', href: '/pages/components/badges.html', icon: 'badge' },
            { id: 'breadcrumb', label: 'Breadcrumb', href: '/pages/components/breadcrumb.html', icon: 'navigation' },
            { id: 'buttons', label: 'Buttons', href: '/pages/components/buttons.html', icon: 'mouse-pointer-click' },
            { id: 'cards', label: 'Cards', href: '/pages/components/cards.html', icon: 'credit-card' },
            { id: 'checkbox', label: 'Checkbox', href: '/pages/components/checkbox.html', icon: 'check-square' },
            { id: 'collapse', label: 'Collapse', href: '/pages/components/collapse.html', icon: 'panel-top-close' },
            { id: 'dropdowns', label: 'Dropdowns', href: '/pages/components/dropdowns.html', icon: 'list' },
            { id: 'pagination', label: 'Pagination', href: '/pages/components/pagination.html', icon: 'skip-forward' },
            { id: 'progress', label: 'Progress', href: '/pages/components/progress.html', icon: 'loader' },
            { id: 'skeleton', label: 'Skeleton', href: '/pages/components/skeleton.html', icon: 'loader' },
            { id: 'tabs', label: 'Tabs', href: '/pages/components/tabs.html', icon: 'square-stack' },
            { id: 'toast', label: 'Toast', href: '/pages/components/toast.html', icon: 'message-circle' }
        ]
    },
    {
        type: 'menu',
        id: 'forms',
        label: 'Forms',
        icon: 'file-text',
        children: [
            { id: 'form-elements', label: 'Form Elements', href: '/pages/forms/forms.html', icon: 'text-cursor-input' },
            { id: 'form-validation', label: 'Validation', href: '/pages/forms/validation.html', icon: 'shield-check' }
        ]
    },
    {
        type: 'menu',
        id: 'content',
        label: 'Content',
        icon: 'type',
        children: [
            { id: 'typography', label: 'Typography', href: '/pages/content/typography.html', icon: 'heading' },
            { id: 'tables', label: 'Tables', href: '/pages/content/tables.html', icon: 'table' },
            { id: 'code-blocks', label: 'Code Blocks', href: '/pages/content/code-blocks.html', icon: 'code' }
        ]
    },
    {
        type: 'menu',
        id: 'overlays',
        label: 'Overlays',
        icon: 'app-window',
        children: [
            { id: 'modal', label: 'Modal', href: '/pages/overlays/modal.html', icon: 'square-stack' },
            { id: 'tooltip', label: 'Tooltip', href: '/pages/overlays/tooltip.html', icon: 'info' }
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
        icon: 'palette',
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
}

// Check if URL matches href
function isUrlMatch(href) {
    const currentPath = window.location.pathname;
    const resolved = resolveHref(href);
    return resolved === currentPath ||
        (currentPath.endsWith('/index.html') && resolved === currentPath.replace('/index.html', '/')) ||
        (resolved.endsWith('/') && currentPath === resolved + 'index.html');
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

    // Open parent menu of active item (without triggering click animation)
    openActiveParentMenu(container);
}

// Render Category Header - THEME-AWARE
function renderCategory(item) {
    return `
        <div class="category-label px-6 py-2 text-[11px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider mt-4">
            <span class="category-text">${item.label}</span>
        </div>
    `;
}

// Render Menu Item with Children - THEME-AWARE with Lucide Icons
function renderMenuItem(item) {
    const hasActiveChild = item.children?.some(child => isUrlMatch(child.href));

    let childrenHtml = '';
    if (item.children) {
        childrenHtml = item.children.map(child => {
            const isActive = isUrlMatch(child.href);
            const childIcon = child.icon ? getLucideIcon(child.icon, 'w-4 h-4 flex-shrink-0') : '';
            return `
                <a href="${resolveHref(child.href)}" 
                   data-id="${child.id}"
                   class="submenu-link flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors
                          ${isActive ? 'bg-sidebar-accent text-primary font-medium' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground focus:bg-sidebar-accent focus:text-sidebar-foreground active:bg-sidebar-accent'}">
                    ${childIcon}
                    <span>${child.label}</span>
                </a>
            `;
        }).join('');
    }

    // Popover links for hover - THEME-AWARE
    const popoverLinks = item.children?.map(child => {
        const childIcon = child.icon ? getLucideIcon(child.icon, 'w-4 h-4 flex-shrink-0') : '';
        return `
            <a href="${resolveHref(child.href)}" class="flex items-center gap-2.5 px-4 py-2 text-sm text-popover-foreground/70 hover:bg-muted hover:text-popover-foreground transition-colors">
                ${childIcon}
                <span>${child.label}</span>
            </a>
        `;
    }).join('') || '';

    const menuIcon = getLucideIcon(item.icon, 'w-5 h-5 flex-shrink-0 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors');
    const arrowIcon = getLucideIcon('plus', `menu-arrow w-4 h-4 text-sidebar-foreground/50 transition-transform duration-300 ${hasActiveChild ? 'rotate-45' : ''}`);

    return `
        <div class="menu-item relative ${hasActiveChild ? 'is-open' : ''}" data-id="${item.id}">
            <button class="menu-toggle w-full h-11 flex items-center px-6 text-sidebar-foreground hover:bg-sidebar-accent focus:bg-sidebar-accent active:bg-sidebar-accent transition-colors duration-200 group">
                ${menuIcon}
                <span class="menu-text flex-1 text-left text-sm font-medium ml-3 truncate">${item.label}</span>
                ${arrowIcon}
            </button>
            <div class="submenu overflow-hidden transition-all duration-300 ease-out ${hasActiveChild ? '' : 'max-h-0'}">
                <div class="py-1 pl-10 pr-4 space-y-0.5">
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

// Render Simple Link - THEME-AWARE with Lucide Icons
function renderLink(item) {
    const isActive = isUrlMatch(item.href);
    const isDisabled = item.disabled;

    const linkIcon = getLucideIcon(item.icon, `w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-primary' : isDisabled ? 'text-sidebar-foreground/20' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground'}`);

    return `
        <div class="menu-link relative" data-id="${item.id}">
            <a href="${isDisabled ? '#' : resolveHref(item.href || '#')}" 
               class="w-full h-11 flex items-center px-6 transition-colors duration-200 group
                      ${isActive ? 'bg-sidebar-accent text-primary' : isDisabled ? 'text-sidebar-foreground/30 cursor-not-allowed' : 'text-sidebar-foreground hover:bg-sidebar-accent focus:bg-sidebar-accent active:bg-sidebar-accent'}"
               ${isDisabled ? 'onclick="return false;"' : ''}>
                ${linkIcon}
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

// Open parent menu of active item without animation
function openActiveParentMenu(container) {
    container.querySelectorAll('.menu-item').forEach(menuItem => {
        if (menuItem.classList.contains('is-open')) {
            const submenu = menuItem.querySelector('.submenu');
            if (submenu) {
                // Set height immediately without transition
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
            }
        }
    });

    // Scroll active link into view
    const activeLink = container.querySelector('.submenu-link.bg-primary\\/10, .menu-link a.bg-primary\\/10');
    if (activeLink) {
        setTimeout(() => {
            activeLink.scrollIntoView({ behavior: 'instant', block: 'center' });
        }, 50);
    }
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
