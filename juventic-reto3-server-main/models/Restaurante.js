const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Restaurante = sequelize.define(
  'restaurante',
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = Restaurante;
