"use strict";
const data = [
  {
    serviceId: "d1573af4-3336-5eda-3086-edd2b3b35b11",
    service_type: "haircut",
    createdAt: "2/2/2023",
    updatedAt: "7/5/2023",
  },
  {
    serviceId: "9bd87abe-ce9d-0ba6-3e3c-cfc502aaac25",
    service_type: "hair color",
    createdAt: "6/2/2023",
    updatedAt: "6/7/2023",
  },
  {
    serviceId: "fa75a26b-fe7b-5dbc-38af-78260251a6e7",
    service_type: "manicure",
    createdAt: "3/1/2023",
    updatedAt: "4/2/2023",
  },
  {
    serviceId: "de4e8dfc-befc-804a-538c-e0c88fda48d4",
    service_type: "pedicure",
    createdAt: "10/10/2023",
    updatedAt: "4/8/2023",
  },
  {
    serviceId: "a0ef0b44-e5af-aadf-fc3a-b155e4d4fdd5",
    service_type: "facial",
    createdAt: "10/1/2023",
    updatedAt: "1/3/2024",
  },
  {
    serviceId: "e7c3526e-0a5e-ccbb-f5a3-2b82b229ab55",
    service_type: "massage",
    createdAt: "12/3/2023",
    updatedAt: "4/5/2023",
  },
];
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
    return await queryInterface.bulkInsert("services", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("services", null, {});
  },
};
