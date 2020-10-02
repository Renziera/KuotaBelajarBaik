import express from 'express';
import websocket from 'ws';
import crypto from 'crypto';
import * as redis from './redis';
import * as puppeteer from './puppeteer';
import config from './config';

// Express instance
const app = express();
// Serve file frontend
app.use(express.static('public'));
// Redirect ke halaman utama
app.use((req, res) => res.redirect('/'));
// Mulai menerima request
const server = app.listen(config.port, '127.0.0.1', () => console.info(`KuotaBelajarBaik berjalan pada port ${config.port}`));
// Membuat server websocket
const wss = new websocket.Server({ server });
// Menerima koneksi websocket
wss.on('connection', connection);

/**
 * Mengurus koneksi websocket
 * @param {websocket} ws Koneksi websocket
 */
function connection(ws) {
    // Handler pesan masuk
    ws.on('message', async function incoming(message) {
        // Membedah pesan masuk
        const [protokol, perintah, id, argumen] = message.split(' ');
        // Cek protokol
        if (protokol !== 'kbb') return;
        // Harus ada id
        if (!id && perintah !== 'id') return;
        // Lakukan perintah
        switch (perintah) {
            case 'id':
                // Generate id baru
                ws.send(`id ${crypto.randomBytes(32).toString('hex')}`);
                break;
            case 'cek':
                // Cek apakah ada room
                ws.send(`meet ${await redis.get(`${id}:meet`) ?? ''}`);
                break;
            case 'room':
                // Membuat room baru
                const meet = await puppeteer.buatRoom(id);
                ws.send(`meet ${meet}`);
                break;
            case 'admit':
                // Klik admit Google Meet
                await puppeteer.admit(id);
                break;
            case 'url':
                // Membuka url di page
                if(!argumen) return;
                await puppeteer.url(id, argumen);
                break;
            case 'heartbeat':
                // Menjaga browser tetap berjalan
                await redis.set(`${id}:presence`, true);
                await redis.expire(`${id}:presence`, 60);
                break;
            default:
                break;
        }
    });
}
