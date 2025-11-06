const dotenv = require("dotenv");
const { Sequelize } = require('sequelize');

dotenv.config();

const sequelize = new Sequelize(
  process.env.BDNOME,
  process.env.BDUSUARIO,
  process.env.BDSENHA,
  {
    host: process.env.BDHOST,
    port: process.env.BDPORTA,
    dialect: 'postgres',
    logging: false 
  }
);
console.log(sequelize)
console.log(process.env)
module.exports = { sequelize };


