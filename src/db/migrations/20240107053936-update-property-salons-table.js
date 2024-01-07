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

    await queryInterface.addColumn("salons", "openinghourstart", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("salons", "closeingHour", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    return;
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("salons", "openinghourstart");
    await queryInterface.removeColumn("salons", "closeingHour");
  },
};
