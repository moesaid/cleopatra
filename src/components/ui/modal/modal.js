// ============================================
// Modal Component - Interactive Behavior
// ============================================

export function initModal() {
    // Open triggers
    document.querySelectorAll('[data-modal-target]').forEach(trigger => {
        if (trigger.hasAttribute('data-modal-init')) return;
        trigger.setAttribute('data-modal-init', 'true');

        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-modal-target');
            openModal(targetId);
        });
    });

    // Close triggers
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
        if (btn.hasAttribute('data-modal-close-init')) return;
        btn.setAttribute('data-modal-close-init', 'true');

        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });

    // Backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        if (modal.hasAttribute('data-modal-backdrop-init')) return;
        modal.setAttribute('data-modal-backdrop-init', 'true');

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.is-open');
            if (openModal) closeModal(openModal.id);
        }
    });
}

export function openModal(id) {
    const modal = document.getElementById(id);
    const backdrop = document.querySelector(`[data-modal-backdrop="${id}"]`) ||
        document.querySelector('.modal-backdrop');

    if (!modal) return;

    document.body.style.overflow = 'hidden';
    if (backdrop) backdrop.classList.add('is-open');
    modal.classList.add('is-open');
}

export function closeModal(id) {
    const modal = document.getElementById(id);
    const backdrop = document.querySelector(`[data-modal-backdrop="${id}"]`) ||
        document.querySelector('.modal-backdrop');

    if (!modal) return;

    modal.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
}

// Expose globally
window.openModal = openModal;
window.closeModal = closeModal;

// Auto-init
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModal);
    } else {
        initModal();
    }
}
