/**
 * Lucide Icons Utility
 * Uses lucide-static package with Vite's ?raw import
 */

// Import icons as raw SVG strings using Vite's ?raw suffix
import layoutDashboard from 'lucide-static/icons/layout-dashboard.svg?raw';
import gauge from 'lucide-static/icons/gauge.svg?raw';
import barChart3 from 'lucide-static/icons/bar-chart-3.svg?raw';
import shoppingCart from 'lucide-static/icons/shopping-cart.svg?raw';
import bitcoin from 'lucide-static/icons/bitcoin.svg?raw';
import mail from 'lucide-static/icons/mail.svg?raw';
import calendar from 'lucide-static/icons/calendar.svg?raw';
import bot from 'lucide-static/icons/bot.svg?raw';
import users from 'lucide-static/icons/users.svg?raw';
import checkSquare from 'lucide-static/icons/check-square.svg?raw';
import store from 'lucide-static/icons/store.svg?raw';
import contact from 'lucide-static/icons/contact.svg?raw';
import packageIcon from 'lucide-static/icons/package.svg?raw';
import home from 'lucide-static/icons/home.svg?raw';
import file from 'lucide-static/icons/file.svg?raw';
import layers from 'lucide-static/icons/layers.svg?raw';
import chevronsUpDown from 'lucide-static/icons/chevrons-up-down.svg?raw';
import alertTriangle from 'lucide-static/icons/alert-triangle.svg?raw';
import user from 'lucide-static/icons/user.svg?raw';
import badge from 'lucide-static/icons/badge.svg?raw';
import navigation from 'lucide-static/icons/navigation.svg?raw';
import mousePointerClick from 'lucide-static/icons/mouse-pointer-click.svg?raw';
import creditCard from 'lucide-static/icons/credit-card.svg?raw';
import panelTopClose from 'lucide-static/icons/panel-top-close.svg?raw';
import list from 'lucide-static/icons/list.svg?raw';
import skipForward from 'lucide-static/icons/skip-forward.svg?raw';
import loader from 'lucide-static/icons/loader.svg?raw';
import squareStack from 'lucide-static/icons/square-stack.svg?raw';
import messageCircle from 'lucide-static/icons/message-circle.svg?raw';
import fileText from 'lucide-static/icons/file-text.svg?raw';
import textCursorInput from 'lucide-static/icons/text-cursor-input.svg?raw';
import shieldCheck from 'lucide-static/icons/shield-check.svg?raw';
import type from 'lucide-static/icons/type.svg?raw';
import heading from 'lucide-static/icons/heading.svg?raw';
import table from 'lucide-static/icons/table.svg?raw';
import code from 'lucide-static/icons/code.svg?raw';
import appWindow from 'lucide-static/icons/app-window.svg?raw';
import info from 'lucide-static/icons/info.svg?raw';
import palette from 'lucide-static/icons/palette.svg?raw';
import plus from 'lucide-static/icons/plus.svg?raw';
// Extra pages icons
import fileX from 'lucide-static/icons/file-x.svg?raw';
import serverCrash from 'lucide-static/icons/server-crash.svg?raw';
import lock from 'lucide-static/icons/lock.svg?raw';
import wrench from 'lucide-static/icons/wrench.svg?raw';
import shield from 'lucide-static/icons/shield.svg?raw';
import logIn from 'lucide-static/icons/log-in.svg?raw';
import userPlus from 'lucide-static/icons/user-plus.svg?raw';
import key from 'lucide-static/icons/key.svg?raw';
import clock from 'lucide-static/icons/clock.svg?raw';
import inbox from 'lucide-static/icons/inbox.svg?raw';
import checkCircle from 'lucide-static/icons/check-circle.svg?raw';

// Icon map
const icons = {
    'layout-dashboard': layoutDashboard,
    'gauge': gauge,
    'bar-chart-3': barChart3,
    'shopping-cart': shoppingCart,
    'bitcoin': bitcoin,
    'mail': mail,
    'calendar': calendar,
    'bot': bot,
    'users': users,
    'check-square': checkSquare,
    'store': store,
    'contact': contact,
    'package': packageIcon,
    'home': home,
    'file': file,
    'layers': layers,
    'chevrons-up-down': chevronsUpDown,
    'alert-triangle': alertTriangle,
    'user': user,
    'badge': badge,
    'navigation': navigation,
    'mouse-pointer-click': mousePointerClick,
    'credit-card': creditCard,
    'panel-top-close': panelTopClose,
    'list': list,
    'skip-forward': skipForward,
    'loader': loader,
    'square-stack': squareStack,
    'message-circle': messageCircle,
    'file-text': fileText,
    'text-cursor-input': textCursorInput,
    'shield-check': shieldCheck,
    'type': type,
    'heading': heading,
    'table': table,
    'code': code,
    'app-window': appWindow,
    'info': info,
    'palette': palette,
    'plus': plus,
    // Extra pages icons
    'file-x': fileX,
    'server-crash': serverCrash,
    'lock': lock,
    'wrench': wrench,
    'shield': shield,
    'log-in': logIn,
    'user-plus': userPlus,
    'key': key,
    'clock': clock,
    'inbox': inbox,
    'check-circle': checkCircle,
};

/**
 * Get Lucide icon SVG with custom classes
 * @param {string} name - Icon name (kebab-case)
 * @param {string} className - Additional CSS classes
 * @returns {string} - SVG markup with applied classes
 */
export function getLucideIcon(name, className = '') {
    const svg = icons[name];
    if (!svg) {
        console.warn(`Lucide icon "${name}" not found`);
        return '';
    }

    // Add classes to the SVG element
    return svg
        .replace('<svg', `<svg class="${className}"`)
        .replace(/width="24"/g, '')
        .replace(/height="24"/g, '');
}
