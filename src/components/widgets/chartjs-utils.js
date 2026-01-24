/**
 * Chart.js Utility
 * Theme-aware configuration and helpers for Chart.js
 * With lazy loading and unique per-chart animations
 */

import {
    Chart,
    LineController,
    DoughnutController,
    BarController,
    BubbleController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

// Register Chart.js components
Chart.register(
    LineController,
    DoughnutController,
    BarController,
    BubbleController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler
);

/**
 * Get theme colors for Chart.js
 */
export function getChartJsColors() {
    const isDark = document.documentElement.classList.contains('dark');
    const styles = getComputedStyle(document.documentElement);

    // Get primary color
    const primary = styles.getPropertyValue('--primary').trim() || (isDark ? '#3b82f6' : '#2563eb');

    return {
        primary,
        text: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        grid: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        background: isDark ? '#1c1c1e' : '#ffffff',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#0ea5e9',
    };
}

/**
 * Get primary color as RGB by creating a hidden element
 */
function getPrimaryRGB() {
    const testEl = document.createElement('div');
    testEl.style.cssText = 'position:absolute;visibility:hidden;background-color:var(--primary)';
    document.body.appendChild(testEl);
    const computedColor = getComputedStyle(testEl).backgroundColor;
    document.body.removeChild(testEl);

    const match = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
        return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
    }
    return { r: 59, g: 130, b: 246 }; // fallback blue
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * Generate 4 primary color shades for charts
 * @returns {string[]} Array of 4 HSL color strings
 */
export function getPrimaryColorShades() {
    const rgb = getPrimaryRGB();
    const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const isDark = document.documentElement.classList.contains('dark');

    // Check if grayscale (saturation < 5%)
    const isGrayscale = s < 5;

    if (isGrayscale) {
        if (isDark) {
            return [
                `hsl(0, 0%, ${l}%)`,
                `hsl(0, 0%, ${Math.max(l - 12, 15)}%)`,
                `hsl(0, 0%, ${Math.max(l - 24, 10)}%)`,
                `hsl(0, 0%, ${Math.max(l - 36, 5)}%)`
            ];
        } else {
            return [
                `hsl(0, 0%, ${l}%)`,
                `hsl(0, 0%, ${Math.min(l + 15, 70)}%)`,
                `hsl(0, 0%, ${Math.min(l + 30, 80)}%)`,
                `hsl(0, 0%, ${Math.min(l + 45, 90)}%)`
            ];
        }
    }

    // For colorful themes, vary saturation and lightness
    if (isDark) {
        return [
            `hsl(${h}, ${s}%, ${l}%)`,
            `hsl(${h}, ${Math.max(s - 10, 20)}%, ${Math.max(l - 10, 25)}%)`,
            `hsl(${h}, ${Math.max(s - 20, 15)}%, ${Math.max(l - 20, 20)}%)`,
            `hsl(${h}, ${Math.max(s - 30, 10)}%, ${Math.max(l - 30, 15)}%)`
        ];
    } else {
        return [
            `hsl(${h}, ${s}%, ${l}%)`,
            `hsl(${h}, ${Math.max(s - 10, 30)}%, ${Math.min(l + 12, 65)}%)`,
            `hsl(${h}, ${Math.max(s - 20, 20)}%, ${Math.min(l + 24, 75)}%)`,
            `hsl(${h}, ${Math.max(s - 30, 15)}%, ${Math.min(l + 36, 85)}%)`
        ];
    }
}

/**
 * Get the primary color RGB values by reading from the DOM
 * This is the most reliable way to get the computed primary color
 * regardless of whether it's defined as HSL, OKLCH, etc.
 */
export function getPrimaryRGBA(alpha = 1) {
    const rgb = getPrimaryRGB();
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/**
 * Add alpha transparency to any color using computed RGB values
 * Works with HSL, OKLCH, or any valid CSS color format
 * @param {number} index - The shade index (0 = darkest, 3 = lightest)
 * @param {number} alpha - The alpha value (0-1)
 */
export function getShadeWithAlpha(index, alpha = 1) {
    // Get the base primary RGB and derive shades from it
    const rgb = getPrimaryRGB();
    const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const isDark = document.documentElement.classList.contains('dark');

    // Calculate lightness offset based on index
    let targetL;
    if (isDark) {
        const offsets = [0, -10, -20, -30];
        targetL = Math.max(l + (offsets[index] || 0), 15);
    } else {
        const offsets = [0, 12, 24, 36];
        targetL = Math.min(l + (offsets[index] || 0), 85);
    }

    return `hsla(${h}, ${s}%, ${targetL}%, ${alpha})`;
}


/**
 * Line chart "drawing" animation - reveals from left to right
 */
export const lineDrawingAnimation = {
    animation: {
        x: {
            type: 'number',
            easing: 'easeOutQuart',
            duration: 1500,
            from: NaN, // Start from invisible
            delay: (ctx) => ctx.dataIndex * 120
        },
        y: {
            type: 'number',
            easing: 'easeOutQuart',
            duration: 1500,
            from: (ctx) => ctx.chart.scales.y.getPixelForValue(0),
            delay: (ctx) => ctx.dataIndex * 120
        }
    },
    transitions: {
        active: {
            animation: { duration: 200 }
        }
    }
};

/**
 * Doughnut radial sweep animation
 */
export const doughnutSweepAnimation = {
    animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1400,
        easing: 'easeOutElastic',
    },
    animations: {
        numbers: {
            type: 'number',
            duration: 1400,
            easing: 'easeOutElastic'
        }
    }
};

/**
 * Bar staggered entrance animation
 */
export const barStaggerAnimation = {
    animation: {
        duration: 1000,
        easing: 'easeOutQuart',
        delay: (ctx) => {
            if (ctx.type === 'data' && ctx.mode === 'default') {
                return ctx.dataIndex * 100;
            }
            return 0;
        }
    }
};

/**
 * Default animation configuration (generic stagger)
 */
export const chartJsAnimationConfig = {
    animation: {
        duration: 1200,
        easing: 'easeOutQuart',
        delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default') {
                delay = context.dataIndex * 80 + context.datasetIndex * 100;
            }
            return delay;
        },
    },
    transitions: {
        active: {
            animation: { duration: 300 }
        },
        hide: {
            animation: { duration: 400 }
        },
        show: {
            animation: { duration: 600, easing: 'easeOutElastic' }
        }
    }
};

/**
 * Deferred Chart.js initialization with lazy loading
 * Uses IntersectionObserver to only create charts when visible
 * 
 * @param {string} elementId - Canvas element ID
 * @param {Function} createChart - Function that creates and returns Chart instance
 * @param {Object} options - Configuration options
 */
export function initChartJsDeferred(elementId, createChart, options = {}) {
    const {
        delay = 100,
        observeVisibility = true,
        staggerOffset = 0,  // Additional delay for staggering multiple charts
    } = options;

    return new Promise((resolve) => {
        const container = document.getElementById(elementId);
        if (!container) {
            resolve(null);
            return;
        }

        // Add loading state class
        const wrapper = container.closest('.chart-container') || container.parentElement;
        if (wrapper) {
            wrapper.classList.add('chart-loading');
        }

        const doCreateChart = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        const rect = container.getBoundingClientRect();

                        if (rect.width > 50) {
                            try {
                                const chart = createChart(container);

                                // Remove loading, add loaded state for fade-in
                                if (wrapper) {
                                    wrapper.classList.remove('chart-loading');
                                    wrapper.classList.add('chart-loaded');
                                }

                                resolve(chart);
                            } catch (e) {
                                console.error('[Chart.js] Creation failed:', e);
                                resolve(null);
                            }
                        } else {
                            // Container not ready, retry
                            setTimeout(doCreateChart, delay);
                        }
                    }, delay + staggerOffset);
                });
            });
        };

        if (observeVisibility) {
            const observer = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        observer.disconnect();
                        doCreateChart();
                    }
                }
            }, { threshold: 0.1 });

            observer.observe(container);
        } else {
            doCreateChart();
        }
    });
}

/**
 * Default scales configuration
 */
export function getDefaultScales(colors) {
    return {
        x: {
            grid: {
                display: false,
                drawBorder: false,
            },
            ticks: {
                color: colors.text,
                font: { size: 11 }
            },
            border: { display: false }
        },
        y: {
            grid: {
                color: colors.grid,
                drawBorder: false,
            },
            ticks: {
                color: colors.text,
                font: { size: 11 }
            },
            border: { display: false }
        }
    };
}

/**
 * Create gradient for Chart.js
 */
export function createGradient(ctx, colorStart, colorEnd) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
}

/**
 * Observe theme changes (class for dark/light, data-theme for primary color)
 */
export function observeThemeChanges(callback) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' ||
                mutation.attributeName === 'style' ||
                mutation.attributeName === 'data-theme') {
                callback();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'style', 'data-theme']
    });

    return observer;
}

export { Chart };

