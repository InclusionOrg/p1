import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import moment from 'moment';

import './App.css';
import { getFormattedReservations, postReservation } from './utils';

const Input = styled.input`
  padding: 0.5em;
`;

const BookedReservations = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10em;
`;

const ReservationForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  max-width: 700px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  width: 7em;
  margin: 1em;
`;

function App() {
  const [reservations, setReservations] = useState({
    booked: [],
    available: {},
  });
  const [resName, setResName] = useState('');
  const [availableHours, setAvailableHours] = useState([]);

  useEffect(() => {
    getFormattedReservations().then(setReservations);
  }, []);

  useEffect(() => {
    const available = Object.keys(reservations.available).filter(
      hour => reservations.available[hour] !== 0
    );

    setAvailableHours(available);
  }, [reservations]);

  async function addReservation(timeSlot) {
    if (resName === '' || typeof resName !== 'string') {
      alert('must be string');
      return;
    }
    let day = new Date();
    day.setHours(timeSlot.slice(0, 2), timeSlot.slice(3, 5), 0, 0);
    await postReservation(resName, day);
    setResName('');

    const formatted = await getFormattedReservations();
    setReservations(formatted);
  }

  return (
    <div className="App">
      <div>Janky Meats</div>

      <BookedReservations>
        <div>RESERVATIONS</div>
        {reservations.booked.map((res, ind) => (
          <div key={res.name + res.slot + ind}>
            {res.name} {res.slot}
          </div>
        ))}
      </BookedReservations>

      <ReservationForm>
        <Input
          type="text"
          value={resName}
          placeholder="Enter your name"
          onChange={e => setResName(e.target.value)}
        />

        <ButtonContainer>
          {availableHours.map(timeSlot => (
            <Button onClick={() => addReservation(timeSlot)}>
              {timeSlot.slice(0, 2) - 12} {timeSlot.slice(2)} PM
            </Button>
          ))}
        </ButtonContainer>
      </ReservationForm>
    </div>
  );
}

export default App;
