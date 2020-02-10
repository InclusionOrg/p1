function getAvailability(reservations) {
  let available = {
    '13:00': 2,
    '13:30': 2,
    '14:00': 2,
    '14:30': 2,
    '15:00': 2,
    '15:30': 2,
    '16:00': 2,
    '16:30': 2,
    '17:00': 2,
    '17:30': 2,
    '18:00': 2,
    '18:30': 2,
    '19:00': 2,
    '19:30': 2,
    '20:00': 2,
    '20:30': 2,
    '21:00': 2,
    '21:30': 2,
    '22:00': 2,
  };

  for (let reservation in reservations) {
    const day = new Date(reservations[reservation].slot);
    const hours = day.getHours().toString();
    const minutes = day.getMinutes().toString();
    const slot = `${hours}:${minutes === '0' ? '00' : minutes}`;
    if (available[slot] > 0) {
      available[slot] -= 1;
    }
  }
  // console.log('available:', available);

  return available;
}

module.exports = {
  getAvailability,
};
