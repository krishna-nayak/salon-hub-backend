"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("salons", "userId", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "userId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("salons", "userId");
  },
};
