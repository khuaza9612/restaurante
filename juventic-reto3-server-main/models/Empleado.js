const { DataTypes } = require('sequelize');
const Restaurante = require('./Restaurante');
const sequelize = require('../db');

const Empleado = sequelize.define(
  'empleado',
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    img: DataTypes.TEXT,
    restaurante_id: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: Restaurante
      }
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = Empleado;
