"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Imagestore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Imagestore.init(
    {
      salonId: {
        type: DataTypes.UUID,
        references: { model: "salons", key: "salonId" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Imagestore",
    }
  );
  return Imagestore;
};
