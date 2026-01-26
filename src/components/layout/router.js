// ============================================
// SPA Router - Client-side navigation
// ============================================

export function initRouter() {
    // Handle all internal link clicks
    document.addEventListener('click', async (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        // Skip external links, new tabs, and special keys
        if (link.origin !== location.origin) return;
        if (link.target === '_blank') return;
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        if (link.hasAttribute('download')) return;

        e.preventDefault();
        await navigate(link.href);
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        loadPage(location.pathname, false);
    });
}

export async function navigate(url) {
    const urlObj = new URL(url, location.origin);
    await loadPage(urlObj.pathname, true);
}

async function loadPage(path, pushState = true) {
    const content = document.getElementById('content');
    if (!content) return;

    // Fade out
    content.style.opacity = '0';
    content.style.transition = 'opacity 150ms ease-out';

    await sleep(150);

    try {
        // Fetch new page
        const response = await fetch(path);
        if (!response.ok) throw new Error('Page not found');

        const html = await response.text();

        // Parse and extract content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.getElementById('content');

        if (newContent) {
            content.innerHTML = newContent.innerHTML;
        }

        // Update URL
        if (pushState) {
            history.pushState({}, '', path);
        }

        // Update title
        const title = doc.querySelector('title');
        if (title) {
            document.title = title.textContent;
        }

        // Re-initialize components for new content
        reinitializeComponents();

    } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to full page load
        location.href = path;
    }

    // Fade in
    content.style.opacity = '1';
}

function reinitializeComponents() {
    // Wait for DOM to be fully painted before re-initializing
    requestAnimationFrame(() => {
        // Dispatch event for components to reinitialize
        document.dispatchEvent(new CustomEvent('page:load'));
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRouter);
} else {
    initRouter();
}
