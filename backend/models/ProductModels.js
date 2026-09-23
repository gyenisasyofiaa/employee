import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define('products', {
  productname: DataTypes.STRING,
  category: DataTypes.STRING,
  price: DataTypes.FLOAT,
  stock: DataTypes.INTEGER
}, {
  freezeTableName: true
});

export default Product;

//buat function untuk baca tabel, gunakan async
(async() => {
  await db.sync()
})();