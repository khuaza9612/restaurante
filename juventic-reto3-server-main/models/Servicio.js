const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Servicio = sequelize.define(
  'servicio',
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name:  DataTypes.TEXT,
    description: DataTypes.TEXT,
    img: DataTypes.TEXT
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = Servicio;
