const { DataTypes } = require('sequelize');
const Cliente = require('./Cliente');
const Restaurante = require('./Restaurante');
const Servicio = require('./Servicio');
const sequelize = require('../db');

const Reserva = sequelize.define(
  'reserva',
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: 'en espera'
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: Cliente
      }
    },
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

Reserva.belongsTo(Cliente, {
  foreignKey: 'cliente_id'
});
Reserva.belongsTo(Restaurante, {
  foreignKey: 'restaurante_id'
});
Reserva.belongsTo(Servicio, {
  foreignKey: 'servicio_id'
});

module.exports = Reserva;
