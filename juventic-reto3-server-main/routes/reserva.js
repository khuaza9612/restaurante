const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Reserva = require('../models/Reserva');
const Cliente = require('../models/Cliente');
const Restaurante = require('../models/Restaurante');
const Servicio = require('../models/Servicio');
const router = Router();

const get = async (req, res) => {
  const reserva = await Reserva.findAll({
    where: {
      cliente_id: req.params.id
    },
    include: [
      {
        model: Cliente
      },
      { model: Servicio }
    ]
  });
  return res.json(reserva);
};

router.get('/reserva', async (req, res) => {
  const reserva = await Reserva.findAll({
    where: { state: 'en espera' },
    include: [{ model: Cliente }, { model: Restaurante }, { model: Servicio }]
  });
  return res.json(reserva);
});

router.get('/reserva/:id', (req, res) => get(req, res));

router.post('/reserva', async (req, res) => {
  const reserva = await Reserva.create(req.body, {
    include: [{ model: Cliente }, { model: Restaurante }, { model: Servicio }]
  });
  return res.json(reserva);
});

router.patch('/reserva/:id', async (req, res) => {
  const reserva = await Reserva.update(
    { state: 'realizado' },
    { where: { id: req.params.id }, include: [{ model: Cliente }, { model: Restaurante }, { model: Servicio }] }
  );
  return res.json(reserva);
});

router.delete('/reserva/:id', async (req, res) => {
  const reserva = await Reserva.update({ state: 'cancelado' }, { where: { id: req.params.id } });
  return res.json(reserva);
});

module.exports = router;
