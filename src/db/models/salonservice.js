"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SalonService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Service, Salon }) {
      // define association here
      this.belongsTo(Service, { foreignKey: "serviceId" });
      this.belongsTo(Salon, { foreignKey: "salonId" });
    }
  }

  SalonService.init(
    {
      salonServiceId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Price must have a integer" },
          notEmpty: { msg: "Price must not be empty" },
        },
      },
      description: DataTypes.STRING,
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "duration must have a STRING" },
          notEmpty: { msg: "duration must not be empty" },
        },
      },
      salonId: {
        type: DataTypes.UUID,
        references: {
          model: "Salon",
          key: "salonId",
        },
      },
      serviceId: {
        type: DataTypes.UUID,
        references: {
          model: "Service",
          key: "salonId",
        },
      },
    },
    {
      sequelize,
      tableName: "salonServices",
      modelName: "SalonService",
    }
  );
  return SalonService;
};
