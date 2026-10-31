const BukuModel = require('../models/buku.model');

exports.getDaftarBuku = async (req, res) => {
    try {
        const listBuku = await BukuModel.getAll();
        res.render('pages/buku-list', {
            pageTitle: 'Master Data Buku Perpustakaan',
            listBuku: listBuku
        });
    } catch (error) {
        console.error('[ERROR getDaftarBuku]:', error);
        res.status(500).send('Terjadi kesalahan internal saat mengambil data buku.');
    }
};

exports.getFormTambah = (req, res) => {
    res.render('pages/buku-form-tambah', {
        pageTitle: 'Tambah Buku Baru'
    });
};

exports.postTambahBuku = async (req, res) => {
    try {
        const { judul_buku, penulis, kategori, harga_denda, jumlah_stok, deskripsi, tanggal_terbit } = req.body;

        if (!judul_buku || !penulis || !kategori || !harga_denda || !jumlah_stok || !tanggal_terbit) {
            return res.status(400).send('Seluruh field wajib diisi kecuali deskripsi!');
        }

        await BukuModel.create({ judul_buku, penulis, kategori, harga_denda, jumlah_stok, deskripsi, tanggal_terbit });
        console.log(`[DATABASE] Buku "${judul_buku}" berhasil ditambahkan.`);
        res.redirect('/buku');
    } catch (error) {
        console.error('[ERROR postTambahBuku]:', error);
        res.status(500).send('Gagal menyimpan data buku ke basis data.');
    }
};

exports.getFormEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const buku = await BukuModel.getById(id);

        if (!buku) {
            return res.status(404).send('Data buku tidak ditemukan.');
        }

        res.render('pages/buku-form-edit', {
            pageTitle: 'Edit Data Buku Perpustakaan',
            buku: buku
        });
    } catch (error) {
        console.error('[ERROR getFormEdit]:', error);
        res.status(500).send('Galat internal saat memuat form edit.');
    }
};

exports.postUpdateBuku = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul_buku, penulis, kategori, harga_denda, jumlah_stok, deskripsi, tanggal_terbit } = req.body;

        await BukuModel.update(id, { judul_buku, penulis, kategori, harga_denda, jumlah_stok, deskripsi, tanggal_terbit });
        console.log(`[DATABASE] Record Buku ID ${id} berhasil diperbarui.`);
        res.redirect('/buku');
    } catch (error) {
        console.error('[ERROR postUpdateBuku]:', error);
        res.status(500).send('Gagal memperbarui data buku.');
    }
};

exports.postHapusBuku = async (req, res) => {
    try {
        const { id } = req.params;
        await BukuModel.delete(id);
        console.log(`[DATABASE] Record Buku ID ${id} berhasil dihapus.`);
        res.redirect('/buku');
    } catch (error) {
        console.error('[ERROR postHapusBuku]:', error);
        res.status(500).send('Gagal menghapus buku dari basis data.');
    }
};