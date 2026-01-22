// ============================================
// Toast Component - Interactive Behavior
// ============================================

let toastContainer = null;

function getToastContainer(position = 'top-right') {
    let container = document.querySelector(`.toast-container.toast-${position}`);
    if (!container) {
        container = document.createElement('div');
        container.className = `toast-container toast-${position}`;
        document.body.appendChild(container);
    }
    return container;
}

export function showToast(options = {}) {
    const {
        title = '',
        description = '',
        variant = 'default',
        duration = 5000,
        position = 'top-right',
        closable = true
    } = options;

    const container = getToastContainer(position);

    const toast = document.createElement('div');
    toast.className = `toast toast-${variant}`;

    const icons = {
        success: 'ri-check-circle-line',
        warning: 'ri-alert-line',
        destructive: 'ri-close-circle-line',
        info: 'ri-information-line',
        default: 'ri-notification-3-line'
    };

    toast.innerHTML = `
        <i class="toast-icon ${icons[variant] || icons.default}"></i>
        <div class="toast-content">
            ${title ? `<div class="toast-title">${title}</div>` : ''}
            ${description ? `<div class="toast-description">${description}</div>` : ''}
        </div>
        ${closable ? '<button class="toast-close"><i class="ri-close-line"></i></button>' : ''}
    `;

    if (closable) {
        toast.querySelector('.toast-close').addEventListener('click', () => dismissToast(toast));
    }

    container.appendChild(toast);

    if (duration > 0) {
        setTimeout(() => dismissToast(toast), duration);
    }

    return toast;
}

export function dismissToast(toast) {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 200);
}

// Convenience methods
export const toast = {
    show: showToast,
    success: (options) => showToast({ ...options, variant: 'success' }),
    warning: (options) => showToast({ ...options, variant: 'warning' }),
    error: (options) => showToast({ ...options, variant: 'destructive' }),
    info: (options) => showToast({ ...options, variant: 'info' })
};

// Expose globally
window.toast = toast;
window.showToast = showToast;
window.dismissToast = dismissToast;
