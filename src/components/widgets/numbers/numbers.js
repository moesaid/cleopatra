// Random number generator
export const num = function (from, to) {
    return Math.floor(Math.random() * to) + from;
};

// Array of random numbers
export const numArr = function (length, max) {
    return Array.from({ length: length }, () => Math.floor(Math.random() * max));
};

// Initialize number displays
export function initNumbers() {
    // return 2 digit
    const el_2 = document.querySelectorAll('.num-2');
    el_2.forEach(e => {
        e.innerText = num(1, 99);
    });

    // return 3 digit
    const el_3 = document.querySelectorAll('.num-3');
    el_3.forEach(e => {
        e.innerText = num(99, 999);
    });

    // return 4 digit
    const el_4 = document.querySelectorAll('.num-4');
    el_4.forEach(e => {
        e.innerText = num(999, 9999);
    });
}

// Auto-init if DOM is ready
if (document.readyState !== 'loading') {
    initNumbers();
} else {
    document.addEventListener('DOMContentLoaded', initNumbers);
}




