/**
 * Menunda eksekusi
 * @param {number} time Waktu dalam ms
 */
export function delay(time) {
    return new Promise(r => setTimeout(r, time));
}

/**
 * Fungsi yang di pass ke DOM context puppeteer untuk mengetahui posisi mouse
 */
export function trackMouse() {
    document.onmousemove = function (e) {
        let x = e.pageX;
        let y = e.pageY;
        e.target.title = `X = ${x} dan Y = ${y}`;
    };
}