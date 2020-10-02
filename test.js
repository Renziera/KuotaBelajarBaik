import puppeteer from 'puppeteer-core';
import config from './config';
import { trackMouse } from './util';

// Menjalankan browser
const browser = await puppeteer.launch(config.browserOptions);

// Membuka halaman baru
const page = await browser.newPage();

// Untuk mengetahui posisi kursor
page.on('domcontentloaded', () => {
    page.evaluate(trackMouse);
});
