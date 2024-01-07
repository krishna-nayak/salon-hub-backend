"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Salon, salonService }) {
      // define association here
      this.belongsToMany(Salon, {
        through: salonService,
        foreignKey: "ServiceId",
      });
      // this.hasMany(salonService);
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Service.init(
    {
      serviceId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      service_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "services",
      modelName: "Service",
    }
  );
  return Service;
};
