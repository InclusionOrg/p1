const express = require('express');
const router = express.Router();
const { Reservation } = require('../../models');
const { getAvailability } = require('./utils');

// GET all reservations
router.get('/', async (req, res) => {
  // const reservations = await Reservation.all();
  const reservations = await Reservation.findAll({ raw: true });
  // console.log('reservations:', reservations);

  const available = getAvailability(reservations);

  res.json({
    booked: reservations,
    available,
  });
});

// POST a reservation for a time
router.post('/book', async (req, res) => {
  const { name, slot } = req.body;
  const reservation = await Reservation.add({
    name,
    slot,
  });
  res.json(reservation);
});

module.exports = router;
