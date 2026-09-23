import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Karyawan = db.define("karyawan", {
  idkary: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  // Nomor karyawan: K001, K002, K003, ...
  nomorkary: {
    type: DataTypes.STRING,
    unique: true,
  },

  namakary: DataTypes.STRING,
  jeniskelamin: DataTypes.STRING,
  jabatan: DataTypes.STRING,
  pendidikan: DataTypes.STRING,
}, {
  freezeTableName: true,
});

export default Karyawan;

// Otomatis membuat tabel di database saat server dijalankan
(async () => {
  await db.sync();
})();

