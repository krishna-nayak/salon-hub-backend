"use strict";

/** @type {import('sequelize-cli').Migration} */
const data = [
  {
    salonId: "80cf4156-a27a-45de-939a-c840c4b4ebc0",
    name: "Zak Felstead",
    address: "Suite 61",
    city: "Hujia",
    openingHourStart: "23:16",
    closeingHour: "8:17",
    createdAt: "7/18/2023",
    updatedAt: "6/19/2023",
  },
  {
    salonId: "b783787b-77dd-4bd9-b3a4-8624fbf1081d",
    name: "Ulberto Stovine",
    address: "Apt 1224",
    city: "Irshava",
    openingHourStart: "3:16",
    closeingHour: "8:00",
    createdAt: "1/28/2023",
    updatedAt: "5/4/2023",
  },
  {
    salonId: "49c5873a-4a54-43f9-b2a2-d9c41471c02c",
    name: "Faun Holton",
    address: "Suite 73",
    city: "Chongkan",
    openingHourStart: "15:25",
    closeingHour: "4:53",
    createdAt: "3/11/2023",
    updatedAt: "9/22/2023",
  },
  {
    salonId: "e6be4fd5-ace6-412c-a494-ae1378d04ade",
    name: "Rutter Korneluk",
    address: "PO Box 99742",
    city: "Talun",
    openingHourStart: "14:07",
    closeingHour: "0:12",
    createdAt: "5/20/2023",
    updatedAt: "12/30/2023",
  },
  {
    salonId: "b2df36e0-cc54-4af8-bc4f-df311afff8de",
    name: "Horten Fisbey",
    address: "Apt 69",
    city: "Somorpenang",
    openingHourStart: "3:14",
    closeingHour: "0:42",
    createdAt: "8/16/2023",
    updatedAt: "2/14/2023",
  },
];

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
    return await queryInterface.bulkInsert("salons", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("salons", null, {});
  },
};
