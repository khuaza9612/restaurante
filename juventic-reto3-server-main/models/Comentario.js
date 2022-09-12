const { DataTypes } = require('sequelize');
const Cliente = require('./Cliente');
const sequelize = require('../db');

const Comentario = sequelize.define(
  'comentario',
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comentario: {
      allowNull: false,
      type: DataTypes.STRING
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: Cliente
      }
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

Comentario.belongsTo(Cliente, {
  foreignKey: 'cliente_id'
});

module.exports = Comentario;
