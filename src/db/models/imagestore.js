const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Imagestore extends Model {
    static associate(models) {
      Imagestore.belongsTo(models.Salon, {
        foreignKey: "salonId",
        onDelete: "CASCADE",
      });
    }
  }

  Imagestore.init(
    {
      salonId: DataTypes.UUID,
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Imagestore",
    }
  );

  return Imagestore;
};
