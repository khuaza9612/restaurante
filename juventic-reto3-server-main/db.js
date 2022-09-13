const { Sequelize } = require('sequelize');
require('dotenv').config(); 
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;


//  const sequelize = new Sequelize('postgres://postgres:Hk1143985102@localhost:5433/juventicc', {
//   logging: false,


// });
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false,
});

module.exports = sequelize;
