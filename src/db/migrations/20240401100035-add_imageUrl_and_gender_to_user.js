"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "imageUrl", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("users", "gender", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "imageUrl");
    await queryInterface.removeColumn("users", "gender");
  },
};
