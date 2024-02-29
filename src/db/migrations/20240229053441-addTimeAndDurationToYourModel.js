"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Appointments", "time", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Appointments", "duration", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Appointments", "time");
    await queryInterface.removeColumn("Appointments", "duration");
  },
};
