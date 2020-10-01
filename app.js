import puppeteer from 'puppeteer-core';
import path from 'path';
import config from './config';

/**
 * Menunda eksekusi
 * @param {number} time Waktu dalam ms
 */
function delay(time) {
    return new Promise(r => setTimeout(r, time));
}

async function login() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: config.chromePath,
        defaultViewport: { width: 1280, height: 720 },
        userDataDir: './user_data',
        args: [
            '--auto-select-desktop-capture-source=pickme',
            '--window-size=1280,900'
        ],
        ignoreDefaultArgs: [
            '--mute-audio',
            '--disable-component-extensions-with-background-pages',
            'about:blank'
        ]
    });
    const page = await browser.newPage();
    await page.goto('https://accounts.google.com');
    await page.keyboard.type(config.email);
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.keyboard.type(config.password);
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await browser.close();
}

async function start() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: config.chromePath,
        defaultViewport: { width: 1280, height: 720 },
        userDataDir: './user_data',
        args: [
            '--auto-select-desktop-capture-source=pickme',
            '--window-size=1280,900'
        ],
        ignoreDefaultArgs: [
            '--mute-audio',
            '--disable-component-extensions-with-background-pages',
            'about:blank'
        ]
    });
    const page = await browser.newPage();
    await page.goto(URL);

    const meet = await browser.newPage();
    // Buka google meet
    await meet.goto('https://meet.google.com/');
    // Click join a meeting
    await meet.mouse.click(950, 350);
    await delay(400);
    // Click continue
    await meet.mouse.click(820, 480);
    await meet.waitForNavigation({ waitUntil: 'networkidle0' });
    await delay(5000);
    // Untuk bypass dialog Share a Chrome Tab
    page.evaluate(() => document.title = 'pickme');
    // Click Present
    await meet.mouse.click(1080, 380);
    await delay(1000);
    console.log(meet.url());
    await page.mouse.click(410, 280);
}

login();