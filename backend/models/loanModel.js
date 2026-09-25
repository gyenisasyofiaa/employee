import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const peminjaman = db.define('peminjaman', {
    nama_peminjam: DataTypes.STRING,
    judul_buku: DataTypes.STRING,
    kategori: DataTypes.STRING,
    tanggal_pinjam: DataTypes.DATEONLY,
    tanggal_kembali: DataTypes.DATEONLY,
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Dipinjam'
    }
}, {
    freezeTableName: true
});

export default peminjaman;

// Buat function untuk baca/sinkronisasi tabel, gunakan async
(async () => {
    await db.sync();
})();
