const baseUrl = `http://localhost:3001/reservations`;

function sum (num1, num2) {
  return num1 + num2;
};

async function getData() {
  return fetch(baseUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}

async function postData(name, slot) {
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
