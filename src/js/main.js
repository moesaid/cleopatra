// Import Tailwind (CSS)
import '../css/tailwind.css';

// Import Custom Component Entry (SCSS)
import '../css/main.scss';

// Import base components
import './base/sidebar.js';
import './base/navbar.js';
import './base/dropdown.js';
import './base/num.js';
import './base/num.js';
import './base/alert.js';
import { initCodeCopy, reinitCodeCopy } from './base/code-copy.js';
import './base/code-block-transformer.js';

// Expose reinitCodeCopy globally for transformer
window.reinitCodeCopy = reinitCodeCopy;

// Import chart functionality
import './charts/init.js';

// Import animations
import './animations/view-transitions.js';
import './animations/scroll-reveal.js';

// Import PrismJS
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';

// Configure normalize-whitespace plugin
Prism.plugins.NormalizeWhitespace.setDefaults({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,
});



console.log('✨ Cleopatra v2.0 - Modern Admin Dashboard');

// Loading Screen
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        // Fade out
        loading.style.transition = 'opacity 0.5s ease-out';
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.remove();
        }, 500);
    }
});
