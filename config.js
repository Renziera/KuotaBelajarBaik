import dotenv from 'dotenv';

// Aktivasi dotenv
dotenv.config();

// Export environment variables
export default {
    port: process.env.PORT,
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    redis: process.env.REDIS,
    browserOptions: {
        headless: false,
        executablePath: process.env.CHROME_PATH,
        defaultViewport: { width: 1280, height: 720 },
        userDataDir: './user_data',
        args: [
            '--auto-select-desktop-capture-source=kuotabelajar',
            '--window-size=1288,850'
        ],
        ignoreDefaultArgs: [
            '--mute-audio',
            '--disable-component-extensions-with-background-pages',
            '--disable-extensions',
            'about:blank'
        ]
    }
};