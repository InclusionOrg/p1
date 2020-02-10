import React from 'react';
import styled from 'styled-components';

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

class App extends React.Component {
  state = {
    bookedReservations: [],
    availableHours: [],
    resName: '',
  };

  componentDidMount() {
    this.refreshReservations();
  }

  refreshReservations = () => {
    getFormattedReservations().then(reservations => {
      const available = Object.keys(reservations.available).filter(
        hour => reservations.available[hour] !== 0
      );

      this.setState({
        bookedReservations: reservations.booked,
        availableHours: available,
      });
    });
  };

  addReservation = async timeSlot => {
    if (this.state.resName === '' || typeof this.state.resName !== 'string') {
      alert('must be string');
      return;
    }
    let day = new Date();
    day.setHours(timeSlot.slice(0, 2), timeSlot.slice(3, 5), 0, 0);

    const newReservation = await postReservation(this.state.resName, day);
    console.log('newReservation:', newReservation);

    this.setState({
      resName: '',
    });

    this.refreshReservations()
  };

  render() {
    return (
      <div className="App">
        <div>Janky Meats</div>

        <BookedReservations>
          <div>RESERVATIONS</div>
          {this.state.bookedReservations.map((res, ind) => (
            <div key={res.name + res.slot + ind}>
              {res.name} {res.slot}
            </div>
          ))}
        </BookedReservations>

        <ReservationForm>
          <Input
            type="text"
            value={this.state.resName}
            placeholder="Enter your name"
            onChange={e => this.setState({ resName: e.target.value })}
          />

          <ButtonContainer>
            {this.state.availableHours.map(timeSlot => (
              <Button onClick={() => this.addReservation(timeSlot)}>
                {timeSlot.slice(0, 2) - 12} {timeSlot.slice(2)} PM
              </Button>
            ))}
          </ButtonContainer>
        </ReservationForm>
      </div>
    );
  }
}

export default App;
