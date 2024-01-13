"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, SalonService }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: "userId",
        // foreignKeyConstraint: true,
      });
      this.belongsTo(SalonService, {
        foreignKey: "salonServiceId",
      });
    }
  }
  Appointment.init(
    {
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "userId",
        },
      },
      salonServiceId: {
        type: DataTypes.UUID,
        references: {
          model: "salonServices",
          key: "salonServiceId",
        },
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Date must be in DD/MM/YYYY" },
          notEmpty: { msg: "Date must not be empty" },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Mention amount paid" },
          notEmpty: { msg: "Status must not be empty" },
        },
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
