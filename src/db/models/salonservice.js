"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class salonService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Service, Salon }) {
      // define association here
      this.belongsTo(Service, { foreignKey: "ServieId" });
      this.belongsTo(Salon, { foreignKey: "SalonId" });
    }
  }
  salonService.init(
    {
      salonServiceId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      price: { type: DataTypes.INTEGER, allowNull: false },
      description: DataTypes.STRING,
      duration: { type: DataTypes.STRING, allowNull: false },
      SalonId: {
        type: DataTypes.UUID,
      },
      ServiceId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      tableName: "salonServices",
      modelName: "salonService",
    }
  );
  return salonService;
};
