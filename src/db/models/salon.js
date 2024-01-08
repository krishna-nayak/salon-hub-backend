"use strict";
const { Model } = require("sequelize");
const salonservice = require("./salonservice");
module.exports = (sequelize, DataTypes) => {
  class Salon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SalonService, Service }) {
      // define association here
      this.belongsToMany(Service, {
        through: SalonService,
        foreignKey: "salonId",
      });
    }
  }
  Salon.init(
    {
      salonId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
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
      openingHourStart: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Timing must follow the timestamp standard" },
          notEmpty: { msg: "Time must not be empty" },
        },
      },
      closeingHour: {
        type: DataTypes.STRING,
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
