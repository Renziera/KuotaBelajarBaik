# KuotaBelajarBaik
**Mekanisme proxy browser ke [Google Meet](https://meet.google.com) dengan [Puppeteer](https://pptr.dev)**

## TL;DR
Ini adalah cara untuk nonton YouTube (atau web apapun) dengan kuota belajar dari Kemendikbud. Silahkan akses [**di sini**](https://kuota.bantu.id).

## Tinjauan
Pada saat repository ini dibuat, Google memberikan akses unlimited pada semua pengguna Google Meet. Dalam rangka yang sama yaitu pandemi COVID-19, Kemendikbud memberikan bantuan [kuota belajar](https://kuota-belajar.kemdikbud.go.id/) 45GB per bulan. Namun kuota tersebut hanya dapat digunakan untuk mengakses situs tertentu dan video conference. Maka muncul lah ide untuk mem-proxy (tidak secara harfiah) situs lain ke Google Meet sehingga yang terpakai adalah kuota belajar.

Secara sederhana, alur kerjanya sebagai berikut:
1. Anda mengakses KuotaBelajarBaik dan membuat room.
2. Puppeteer membuka browser di server dan membuat meeting baru.
3. Anda mendapatkan link Google Meet dan join dengan akun apapun.
4. Puppeteer akan present screen browser di server.

> Seperti yang kita tahu, penggunaan Puppeteer di sini rentan rusak. Repo ini memang niche sekali karena situasi. Terakhir dicoba di Ubuntu 20.04 pada 2 Oktober 2020.

## Instalasi
### Requirements
* NodeJS 14+
* Redis
* Chrome browser (bukan Chromium)
### Steps
1. Clone (atau fork dulu) repository ini
```bash
$ git clone https://github.com/Renziera/KuotaBelajarBaik.git
```
2. Masuk ke folder repo
```bash
$ cd KuotaBelajarBaik/
```
3. Copy `.env.example` ke `.env`
```bash
$ cp .env.example .env
```
4. Edit `.env` dan isi dengan environment variables anda
```bash
$ nano .env
```
5. Install dependency
```bash
$ npm install
```
6. Tes Puppeteer, seharusnya Chrome akan muncul
```bash
$ npm test
```
7. Jalankan aplikasi
```bash
$ npm start
```

## Hacktoberfest
Kebetulan sekarang juga waktu yang tepat untuk ikut [Hacktoberfest](https://hacktoberfest.digitalocean.com/). Silahkan membuat Pull Request ke repo ini, siapa saja boleh melakukannya. Apalagi kalau anda anggota *atau calon* [OmahTI](https://omahti.web.id), auto diterima divisi WebDev :)

Berikut beberapa kendala atau improvisasi yang dibutuhkan:
1. Frontend perlu dihias agar lebih menarik 
2. Error handling di berbagai tempat
3. Mekanisme untuk mengontrol browser lewat Google Meet
4. Otomatis mengatur kualitas ke 720p
5. Menghilangkan banner `Chrome is under automation` di browser
6. Mengatasi masalah resolusi viewport tab yang tidak konsisten
7. Walaupun kecepatan internet server 1 GBps, terkadang masih terjadi blur atau lag. Saya cukup yakin ini karena Google Meet men-throttle bandwidth ~~meskipun unlimited~~.
8. Karena untuk kasus ini Chrome tidak dapat dijalankan secara `headless` sehingga membutuhkan X server, saya kesulitan untuk menjalankannya sebagai service atau daemon. Jika dijalankan di `PM2` maka DISPLAY number harus diketahui terlebih dahulu dan dipastikan sudah berjalan. *Tidak tahu cara melakukannya di VM tanpa monitor*
9. Dan masih banyak lagi...

Untuk kalian yang mager tapi mau ikut Hacktoberfest, sudah saya siapkan file `NebengNama`. Silahkan tulis nama kalian dan buat PR.

## Lisensi
Didistribusikan di bawah lisensi `GNU General Public License v3.0`.
Lihat [LICENSE](https://github.com/Renziera/KuotaBelajarBaik/blob/master/LICENSE) untuk keterangan lebih lanjut.