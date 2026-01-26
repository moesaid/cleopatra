/**
 * Chart Initialization Utility
 * 
 * This module provides proper deferred chart initialization to fix the sizing issue
 * where charts render before CSS layout has stabilized.
 * 
 * Strategy:
 * 1. Wait for DOM to be fully ready (fonts, styles loaded)
 * 2. Use IntersectionObserver to lazy-load charts only when visible
 * 3. Use requestAnimationFrame to defer to next paint cycle
 * 4. Small delay to ensure CSS grid/flexbox has calculated final dimensions
 */

/**
 * Wait for the document and all resources to be ready
 */
export function whenReady(callback) {
    if (document.readyState === 'complete') {
        // If already loaded, use requestAnimationFrame for next paint cycle
        requestAnimationFrame(() => {
            requestAnimationFrame(callback);
        });
    } else {
        window.addEventListener('load', () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(callback);
            });
        });
    }
}

/**
 * Deferred chart initialization with multiple safeguards
 * @param {string} elementId - The chart container element ID
 * @param {Function} createChart - Function that creates and returns the ApexCharts instance
 * @param {Object} options - Configuration options
 * @returns {Promise<ApexCharts|null>} - The chart instance or null
 */
export function initChartDeferred(elementId, createChart, options = {}) {
    const {
        delay = 100,           // Base delay before creating chart
        observeVisibility = true, // Use IntersectionObserver
        onResize = null,       // Callback for resize handling
    } = options;

    return new Promise((resolve) => {
        const container = document.getElementById(elementId);
        if (!container) {
            resolve(null);
            return;
        }

        let chart = null;
        let resizeObserver = null;
        let resizeTimeout = null;

        const doCreateChart = () => {
            // Wait for next animation frames to ensure CSS has settled
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        const rect = container.getBoundingClientRect();

                        // Only create if we have valid dimensions
                        if (rect.width > 50) {
                            try {
                                chart = createChart(container, rect.width);

                                // Setup resize observer for future resizes
                                resizeObserver = new ResizeObserver((entries) => {
                                    for (const entry of entries) {
                                        const { width } = entry.contentRect;
                                        if (width > 50 && chart) {
                                            if (resizeTimeout) clearTimeout(resizeTimeout);
                                            resizeTimeout = setTimeout(() => {
                                                if (onResize) {
                                                    onResize(chart, width);
                                                } else {
                                                    chart.updateOptions({ chart: { width } }, false, false);
                                                }
                                            }, 100);
                                        }
                                    }
                                });
                                resizeObserver.observe(container);

                                resolve(chart);
                            } catch (e) {
                                console.error('Chart creation failed:', e);
                                resolve(null);
                            }
                        } else {
                            // Container not ready, retry after delay
                            setTimeout(doCreateChart, delay);
                        }
                    }, delay);
                });
            });
        };

        if (observeVisibility) {
            // Use IntersectionObserver for lazy loading
            const intersectionObserver = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        intersectionObserver.disconnect();
                        doCreateChart();
                    }
                }
            }, { threshold: 0.1 });

            intersectionObserver.observe(container);
        } else {
            doCreateChart();
        }
    });
}

/**
 * Setup theme observer for chart color updates
 * @param {Function} updateCallback - Function to call when theme changes
 * @returns {MutationObserver} - The observer instance
 */
export function setupThemeObserver(updateCallback) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' ||
                mutation.attributeName === 'style' ||
                mutation.attributeName === 'data-theme') {
                // Debounce theme updates
                setTimeout(updateCallback, 50);
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'style', 'data-theme']
    });

    return observer;
}

/**
 * Get primary color from CSS variable (handles oklch, hsl, hex)
 */
export function getPrimaryColor() {
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryValue = rootStyles.getPropertyValue('--primary').trim();

    if (!primaryValue) return '#3b82f6';

    if (primaryValue.startsWith('#') ||
        primaryValue.startsWith('rgb') ||
        primaryValue.startsWith('hsl') ||
        primaryValue.startsWith('oklch')) {
        return primaryValue;
    }

    const parts = primaryValue.split(/\s+/);
    if (parts.length >= 3 && parseFloat(parts[0]) <= 1) {
        return `oklch(${primaryValue})`;
    }

    return `hsl(${primaryValue})`;
}

/**
 * Get theme-aware colors
 */
export function getThemeColors() {
    const isDark = document.documentElement.classList.contains('dark');
    return {
        primary: getPrimaryColor(),
        text: isDark ? '#a1a1aa' : '#71717a',
        grid: isDark ? '#27272a' : '#f4f4f5',
        track: isDark ? '#27272a' : '#e4e4e7',
        foreground: isDark ? '#fafafa' : '#09090b',
        muted: isDark ? '#71717a' : '#a1a1aa',
    };
}
