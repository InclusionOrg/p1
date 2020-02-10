const baseUrl = `http://localhost:3001/reservations`;

export async function getFormattedReservations() {
  const result = await getReservations();
  console.log('result:', result);
  const formattedBooked = result.booked.map(rezz => {
    rezz.slot = new Date(rezz.slot).toLocaleString();
    return rezz;
  });

  return {
    booked: formattedBooked,
    ...result,
  };
}

export async function getReservations() {
  return fetch(baseUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}

export async function postReservation(name, slot) {
  return fetch(`${baseUrl}/book`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      slot,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}
