"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("salonServices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      salonServiceId: {
        type: Sequelize.UUID,
      },
      price: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.STRING,
      },
      salonId: {
        type: Sequelize.UUID,
        references: {
          model: "salons",
          key: "salonId",
        },
      },
      serviceId: {
        type: Sequelize.UUID,
        references: {
          model: "services",
          key: "serviceId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("salonServices");
  },
};
