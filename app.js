const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/database');
const bukuRoutes = require('./routes/buku.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Rute Aplikasi
app.use('/', bukuRoutes);

// Jalankan Server & Pengujian Koneksi
db.query('SELECT 1 + 1 AS result')
    .then(() => {
        console.log('[DATABASE] Terhubung ke MySQL Pool db_perpustakaan secara aman.');
        app.listen(PORT, () => console.log(`[SERVER] Aktif di http://localhost:${PORT}/buku`));
    })
    .catch(err => {
        console.error('[DATABASE ERROR] Gagal terhubung ke MySQL:', err.message);
    });