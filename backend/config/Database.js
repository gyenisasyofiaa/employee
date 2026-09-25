import { Sequelize } from "sequelize";

const db = new Sequelize('library_loan', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default db;