const db = require('../config/database');

const BukuModel = {
    // READ ALL
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM buku ORDER BY id DESC');
        return rows;
    },

    // READ ONE
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM buku WHERE id = ?', [id]);
        return rows[0];
    },

    // CREATE
    create: async (data) => {
        const sql = `INSERT INTO buku (judul_buku, penulis, kategori, harga_denda, jumlah_stok, deskripsi, tanggal_terbit) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.query(sql, [
            data.judul_buku,
            data.penulis,
            data.kategori,
            data.harga_denda,
            data.jumlah_stok,
            data.deskripsi,
            data.tanggal_terbit
        ]);
        return result;
    },

    // UPDATE
    update: async (id, data) => {
        const sql = `UPDATE buku 
                     SET judul_buku = ?, penulis = ?, kategori = ?, harga_denda = ?, jumlah_stok = ?, deskripsi = ?, tanggal_terbit = ? 
                     WHERE id = ?`;
        const [result] = await db.query(sql, [
            data.judul_buku,
            data.penulis,
            data.kategori,
            data.harga_denda,
            data.jumlah_stok,
            data.deskripsi,
            data.tanggal_terbit,
            id
        ]);
        return result;
    },

    // DELETE
    delete: async (id) => {
        const sql = 'DELETE FROM buku WHERE id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    }
};

module.exports = BukuModel;