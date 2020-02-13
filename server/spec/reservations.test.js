const { getAvailability } = require('../routes/reservations/utils');

test('should return correct # of timeslots for availability', () => {
  const available = getAvailability([]);
  const timeslots = Object.keys(available);

  expect(timeslots.length).toBe(19);
});

test('should return correct types of timeslots for availability', () => {
  const available = getAvailability([]);
  const timeslots = Object.keys(available);

  timeslots.forEach(slot => {
    expect(typeof slot).toBe('string');
    expect(typeof available[slot]).toBe('number');
  });
});

const testBookedReservations = [
  {
    name: 'Test 1',
    slot: new Date('21 Feb 2020 13:00:00 GMT-0500'),
  },
  {
    name: 'Test 2',
    slot: new Date('21 Feb 2020 13:30:00 GMT-0500'),
  },
];

test.skip('should return correct number of reservations given current booked reservations', () => {
  const available = getAvailability(testBookedReservations);

  expect(available['13:00']).toBe(1);
});

test.skip('should return correct number of subsequent reservations given current booked reservations', () => {
  const available = getAvailability(testBookedReservations);

  expect(available['13:00']).toBe(1);
  expect(available['13:30']).toBe(0);
  expect(available['14:00']).toBe(1);
});
