// ============================================
// Scroll-Driven Animations
// ============================================

export function initScrollReveal() {
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
        console.log('Intersection Observer not supported');
        return;
    }

    // Create observer for scroll reveal animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-revealed');
                    // Optionally unobserve after revealing
                    // observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    // Observe all elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    // Add scroll-reveal class to cards for automatic animation
    const cards = document.querySelectorAll('.report-card, .card');
    cards.forEach((card, index) => {
        card.classList.add('scroll-reveal');
        card.style.setProperty('--reveal-delay', `${index * 50}ms`);
    });

    console.log(`✨ Scroll reveal enabled for ${revealElements.length + cards.length} elements`);
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
    initScrollReveal();
}
