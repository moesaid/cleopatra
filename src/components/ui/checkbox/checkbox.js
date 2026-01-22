// ============================================
// Checkbox Component - Interactive Behavior
// ============================================

export function initCheckbox() {
    // Handle checkbox card clicks
    document.querySelectorAll('.checkbox-card').forEach(card => {
        if (card.hasAttribute('data-checkbox-init')) return;
        card.setAttribute('data-checkbox-init', 'true');

        const checkbox = card.querySelector('.checkbox');
        if (!checkbox) return;

        // Sync initial state
        card.classList.toggle('is-checked', checkbox.checked);

        // Handle card click
        card.addEventListener('click', (e) => {
            if (e.target === checkbox) return; // Let native checkbox handle
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        });

        // Sync card state with checkbox
        checkbox.addEventListener('change', () => {
            card.classList.toggle('is-checked', checkbox.checked);
        });
    });
}

export function reinitCheckbox() {
    initCheckbox();
}

// Auto-init
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCheckbox);
    } else {
        initCheckbox();
    }
}
