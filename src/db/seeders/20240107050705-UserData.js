"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return await queryInterface.bulkInsert(
      "users",
      [
        {
          userId: "f57ba5ea-3dbe-4f88-aab6-95ef83b6b7d8",
          fullName: "Admin",
          email: "admin@salon.com",
          password: "admin@123",
          role: "admin",
          createdAt: "8/8/2023",
          updatedAt: "4/12/2023",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("users", null, {});
  },
};
