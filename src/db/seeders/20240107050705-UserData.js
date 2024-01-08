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
          fullName: "Michel Massel",
          email: "mmassel0@blog.com",
          password: "mZ5_6/6D~,",
          role: "admin",
          createdAt: "8/8/2023",
          updatedAt: "4/12/2023",
        },
        {
          userId: "5081beac-1d5a-4f08-ad55-2face04e362a",
          fullName: "Ardith Surplice",
          email: "asurplice1@senate.gov",
          password: "eA6'gV(tC5Pedj.",
          role: "customer",
          createdAt: "11/9/2023",
          updatedAt: "6/11/2023",
        },
        {
          userId: "d8a0acea-015c-4da9-9d5c-a0f7777fd0af",
          fullName: "Gus Seamen",
          email: "gseamen2@topsy.com",
          password: "vV3>bYSmL",
          role: "customer",
          createdAt: "6/12/2023",
          updatedAt: "6/2/2023",
        },
        {
          userId: "f1d2ca63-a8e5-4fed-8f8d-f5dba8c2a10c",
          fullName: "Elsa Salmen",
          email: "esalmen3@baidu.com",
          password: "yI7>>3\\>Zp7",
          role: "admin",
          createdAt: "3/2/2023",
          updatedAt: "7/6/2023",
        },
        {
          userId: "7232f11f-b5dc-47d0-ba14-8f2bbe3afb02",
          fullName: "Kiel Bowkley",
          email: "kbowkley4@jimdo.com",
          password: 'pC5"bn%+',
          role: "admin",
          createdAt: "2/9/2023",
          updatedAt: "10/8/2023",
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
