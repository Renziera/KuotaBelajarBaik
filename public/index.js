// Mount Vue app
const app = new Vue({
    el: '#app',
    data: {
        loading: true,
        meet: false,
        url: ''
    },
    methods: {
        room: function () {
            this.loading = true;
            socket.send(`kbb room ${id}`);
        },
        admit: function () {
            socket.send(`kbb admit ${id}`);
        },
        akses: function () {
            socket.send(`kbb url ${id} ${this.url}`);
            this.url = '';
        }
    }
});

// Ambil id dari localStorage
let id = window.localStorage.getItem('id');
// URL WebSocket
const url = `${window.location.protocol === 'https:' ? 'wss://' : 'ws://'}${window.location.host}`;
// Membuat koneksi WebSocket
const socket = new WebSocket(url);
// Koneksi terhubung
socket.onopen = () => {
    socket.send('kbb id');
};
// Menerima pesan
socket.onmessage = message => {
    // Memisahkan perintah dan argumen
    const [perintah, argumen] = message.data.split(' ');
    // Mendapatkan id
    if (perintah === 'id') {
        // Assign id jika belum ada
        if (!id) {
            id = argumen;
            window.localStorage.setItem('id', id);
        }
        // Cek apakah sudah ada room
        socket.send(`kbb cek ${id}`);
        // Mulai heartbeat
        setInterval(() => socket.send(`kbb heartbeat ${id}`, 20000));
    }
    // Mendapatkan link google meet
    if (perintah === 'meet') {
        if (argumen) {
            // Ada room
            app.meet = argumen;
        } else {
            // Belum ada room
            app.meet = false;
        }
        // Stop loading
        app.loading = false;
    }
};
