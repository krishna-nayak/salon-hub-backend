"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Appointments", "name", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Appointments", "gender", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Appointments", "name");
    await queryInterface.removeColumn("Appointments", "gender");
  },
};
