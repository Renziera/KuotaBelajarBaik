import puppeteer from 'puppeteer-core';
import config from './config';
import * as redis from './redis';
import { delay } from './util';

/**
 * Login akun Google untuk Meet
 */
async function login() {
    // Menjalankan browser
    const browser = await puppeteer.launch(config.browserOptions);
    const [page] = await browser.pages();
    // Coba login Google
    await page.goto('https://accounts.google.com');
    // Sudah login
    if (page.url().includes('myaccount')) return await browser.close();
    // Masukkan kredensial
    await page.keyboard.type(config.email);
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.keyboard.type(config.password);
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    // Selesai login
    await browser.close();
}

/**
 * Membuat room google meet
 * @param {string} id ID Pengguna
 */
export async function buatRoom(id) {
    // Cek apakah ada room
    let url = await redis.get(`${id}:meet`);
    if (url) return url;
    // Menjalankan browser baru
    const browser = await puppeteer.launch(config.browserOptions);
    // Tab untuk di present
    const [page] = await browser.pages();
    // Buka YouTube
    await page.goto('https://youtube.com');
    // Tab untuk Google Meet
    const meet = await browser.newPage();
    // Buka google meet
    await meet.goto('https://meet.google.com/');
    // Click join a meeting
    await meet.mouse.click(950, 350);
    await delay(1000);
    // Click continue
    await meet.mouse.click(820, 480);
    await meet.waitForNavigation({ waitUntil: 'networkidle0' });
    // Menunggu tombol Present
    await meet.waitForXPath('//*[@id="yDmH0d"]/c-wiz/div/div/div[4]/div[3]/div/div/div[2]/div/div/div[2]/div/div[2]/div/div[1]/div[2]/span');
    await delay(500);
    // Untuk bypass dialog Share a Chrome Tab
    page.evaluate(() => document.title = 'kuotabelajar');
    // Click Present
    await meet.mouse.click(1080, 380);
    await delay(1000);
    // Link Google Meet
    url = meet.url();
    // Tulis ke redis
    await redis.set(`${id}:meet`, url);
    await redis.set(`${id}:browser`, browser.wsEndpoint());
    // Detach browser
    browser.disconnect();
    // Mengembalikan link
    return url;
}

/**
 * Click admit ke Google Meet
 * @param {string} id ID Pengguna
 */
export async function admit(id) {
    // Cek redis
    const browserWSEndpoint = await redis.get(`${id}:browser`);
    if (!browserWSEndpoint) return;
    // Mendapatkan browser
    const browser = await puppeteer.connect({ browserWSEndpoint, defaultViewport: { width: 1280, height: 720 } });
    // Mendapatkan Tab Google Meet
    const [, meet] = await browser.pages();
    // Click admit
    await meet.mouse.click(840, 420);
    // Detach browser
    browser.disconnect();
}

/**
 * Mengakses alamat di page
 * @param {string} id ID Pengguna
 * @param {string} url Alamat yang ingin diakses
 */
export async function url(id, url) {
    // Cek redis
    const browserWSEndpoint = await redis.get(`${id}:browser`);
    if (!browserWSEndpoint) return;
    // Mendapatkan browser
    const browser = await puppeteer.connect({ browserWSEndpoint, defaultViewport: { width: 1280, height: 720 } });
    // Mendapatkan Tab yang di Present
    const [page] = await browser.pages();
    // Akses url
    await page.goto(url);
    // Detach browser
    browser.disconnect();
}

/**
 * Cek heartbeat dan menutup browser
 */
async function cekHeartbeat() {

}
