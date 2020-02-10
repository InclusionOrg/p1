'use strict';
module.exports = (sequelize, DataTypes) => {
  const SequelizeReservation = sequelize.define(
    'Reservation',
    {
      name: DataTypes.STRING,
      slot: DataTypes.DATE,
    },
    {}
  );

  class Reservation extends SequelizeReservation {
    static async all() {
      return await this.findAll();
    }

    static async add(reservation) {
      return this.create({
        name: reservation.name,
        slot: reservation.slot,
      });
    }
  }

  return Reservation;
};
