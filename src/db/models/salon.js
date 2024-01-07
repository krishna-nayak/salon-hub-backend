"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Salon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Salon.init(
    {
      salonid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Salon must have a name" },
          notEmpty: { msg: "Salon must not be empty" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Salon must have a address" },
          notEmpty: { msg: "Address must not be empty" },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Salon must be in a city" },
          notEmpty: { msg: "City must not be empty" },
        },
      },
      openinghourstart: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Timing must follow the timestamp standard" },
          notEmpty: { msg: "Time must not be empty" },
        },
      },
      closeingHour: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Timing must follow the timestamp standard" },
          notEmpty: { msg: "Time must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "salons",
      modelName: "Salon",
    }
  );
  return Salon;
};
