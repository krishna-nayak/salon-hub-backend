"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Salon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SalonService, Service, User, Imagestore }) {
      // define association here
      this.belongsToMany(Service, {
        through: SalonService,
        foreignKey: "salonId",
        onDelete: "CASCADE",
      });

      this.belongsTo(User, {
        foreignKey: "userId", // This should match the foreign key in the User table
        onDelete: "CASCADE",
      });
      this.hasMany(Imagestore, {
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
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "userId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      imageId: {
        type: DataTypes.STRING,
        allowNull: true,
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
