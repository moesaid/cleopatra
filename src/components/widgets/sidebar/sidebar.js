// ============================================
// Sidebar Component - Data-Driven Navigation
// ============================================

// Menu Data Structure
const menuData = [
    {
        type: 'menu',
        id: 'dashboards',
        label: 'Dashboards',
        icon: 'ri-layout-grid-line',
        children: [
            { id: 'light-sidebar', label: 'Light Sidebar', href: '/pages/' },
            { id: 'dark-sidebar', label: 'Dark Sidebar', href: '/pages/index-1.html' }
        ]
    },
    {
        type: 'category',
        label: 'USER'
    },
    {
        type: 'menu',
        id: 'public-profile',
        label: 'Public Profile',
        icon: 'ri-user-line',
        children: [
            { id: 'profiles', label: 'Profiles', href: '#' },
            { id: 'projects', label: 'Projects', href: '#' },
            { id: 'works', label: 'Works', href: '#' }
        ]
    },
    {
        type: 'menu',
        id: 'my-account',
        label: 'My Account',
        icon: 'ri-settings-3-line',
        children: [
            { id: 'account-home', label: 'Account Home', href: '#' },
            { id: 'get-started', label: 'Get Started', href: '#' },
            { id: 'user-profile', label: 'User Profile', href: '#' },
            { id: 'company-profile', label: 'Company Profile', href: '#' },
            { id: 'settings', label: 'Settings', href: '#' }
        ]
    },
    {
        type: 'menu',
        id: 'network',
        label: 'Network',
        icon: 'ri-group-line',
        children: [
            { id: 'get-started-network', label: 'Get Started', href: '#' },
            { id: 'user-cards', label: 'User Cards', href: '#' },
            { id: 'mini-cards', label: 'Mini Cards', href: '#' }
        ]
    },
    {
        type: 'menu',
        id: 'authentication',
        label: 'Authentication',
        icon: 'ri-shield-keyhole-line',
        children: [
            { id: 'sign-in', label: 'Sign In', href: '#' },
            { id: 'sign-up', label: 'Sign Up', href: '#' },
            { id: 'reset-password', label: 'Reset Password', href: '#' }
        ]
    },
    {
        type: 'category',
        label: 'APPS'
    },
    {
        type: 'menu',
        id: 'store-client',
        label: 'Store - Client',
        icon: 'ri-store-2-line',
        children: [
            { id: 'store-home', label: 'Home', href: '#' },
            { id: 'store-products', label: 'Products', href: '#' },
            { id: 'store-cart', label: 'Cart', href: '#' }
        ]
    },
    {
        type: 'link',
        id: 'store-admin',
        label: 'Store - Admin',
        icon: 'ri-shopping-bag-line',
        status: 'Soon',
        disabled: true
    },
    {
        type: 'link',
        id: 'store-services',
        label: 'Store - Services',
        icon: 'ri-customer-service-2-line',
        status: 'Soon',
        disabled: true
    },
    {
        type: 'link',
        id: 'ai-prompt',
        label: 'AI Prompt',
        icon: 'ri-robot-2-line',
        status: 'Soon',
        disabled: true
    },
    {
        type: 'link',
        id: 'invoice-generator',
        label: 'Invoice Generator',
        icon: 'ri-file-text-line',
        status: 'Soon',
        disabled: true
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

// Render Category Header
function renderCategory(item) {
    return `
        <div class="category-label px-6 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-4">
            <span class="category-text">${item.label}</span>
        </div>
    `;
}

// Render Menu Item with Children
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
                          ${isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}">
                    ${isActive ? '<span class="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></span>' : ''}
                    <span>${child.label}</span>
                </a>
            `;
        }).join('');
    }

    // Popover links for hover
    const popoverLinks = item.children?.map(child => `
        <a href="${child.href}" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">${child.label}</a>
    `).join('') || '';

    return `
        <div class="menu-item relative ${hasActiveChild ? 'is-open' : ''}" data-id="${item.id}">
            <button class="menu-toggle w-full h-11 flex items-center px-6 text-gray-700 hover:bg-gray-50 transition-all duration-200 group">
                <i class="${item.icon} text-[18px] text-gray-400 group-hover:text-gray-600 transition-colors w-5 flex-shrink-0"></i>
                <span class="menu-text flex-1 text-left text-sm font-medium ml-3 truncate">${item.label}</span>
                <i class="menu-arrow ri-add-line text-gray-400 transition-transform duration-300 ${hasActiveChild ? 'rotate-45' : ''}"></i>
            </button>
            <div class="submenu transition-all duration-300 overflow-hidden ${hasActiveChild ? 'max-h-[500px]' : 'max-h-0'}">
                <div class="py-1 pl-14 pr-4">
                    ${childrenHtml}
                </div>
            </div>
            <!-- Hover Popover -->
            <div class="menu-popover absolute left-full top-0 ml-1 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-[100] opacity-0 invisible transition-all duration-200">
                <div class="px-4 py-2 text-sm font-semibold text-gray-900 border-b border-gray-100">${item.label}</div>
                ${popoverLinks}
            </div>
        </div>
    `;
}

// Render Simple Link
function renderLink(item) {
    const isDisabled = item.disabled;

    return `
        <div class="menu-link relative" data-id="${item.id}">
            <a href="${isDisabled ? '#' : item.href || '#'}" 
               class="w-full h-11 flex items-center px-6 transition-all duration-200 group ${isDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}"
               ${isDisabled ? 'onclick="return false;"' : ''}>
                <i class="${item.icon} text-[18px] ${isDisabled ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-600'} w-5 flex-shrink-0 transition-colors"></i>
                <span class="menu-text flex-1 text-left text-sm font-medium ml-3 truncate">${item.label}</span>
                ${item.status ? `<span class="status-badge text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-medium">${item.status}</span>` : ''}
            </a>
            <!-- Hover Tooltip -->
            <div class="menu-tooltip absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-[100] opacity-0 invisible transition-all duration-200">
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
    container.querySelectorAll('.submenu-link, .menu-popover a').forEach(link => {
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

// Set Active by Current URL
function setActiveByUrl() {
    const container = document.getElementById('sidebar');
    if (!container) return;

    // Clear all active states
    container.querySelectorAll('.submenu-link').forEach(link => {
        link.classList.remove('bg-blue-50', 'text-blue-600', 'font-medium');
        link.classList.add('text-gray-600', 'hover:bg-gray-100', 'hover:text-gray-900');
        const bullet = link.querySelector('.w-1\\.5');
        if (bullet) bullet.remove();
    });

    // Set active based on URL
    container.querySelectorAll('.submenu-link').forEach(link => {
        if (isUrlMatch(link.getAttribute('href'))) {
            link.classList.remove('text-gray-600', 'hover:bg-gray-100', 'hover:text-gray-900');
            link.classList.add('bg-blue-50', 'text-blue-600', 'font-medium');

            if (!link.querySelector('.w-1\\.5')) {
                const bullet = document.createElement('span');
                bullet.className = 'w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0';
                link.insertBefore(bullet, link.firstChild);
            }

            // Open parent menu
            const menuItem = link.closest('.menu-item');
            if (menuItem && !menuItem.classList.contains('is-open')) {
                menuItem.querySelector('.menu-toggle')?.click();
            }
        }
    });
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
