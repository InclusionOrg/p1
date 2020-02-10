const { Reservation } = require('../models');

test('Reservation.all() should return an array', async () => {
  const result = (await Reservation.all()) || [];
  expect(result.length).not.toBe(0);
});

test('Reservation.create() should add a reservation to the db', async () => {
  const allReservations = await Reservation.all();
  const oldLength = allReservations.length;

  await Reservation.add({
    name: 'Newly Created Reservation',
    slot: new Date('21 Feb 2020 13:00:00 GMT-0500'),
  });

  const reservations = await Reservation.all();

  expect(reservations.length).toBe(oldLength + 1);
  expect(reservations[reservations.length - 1].name).toBe(
    'Newly Created Reservation'
  );
});
