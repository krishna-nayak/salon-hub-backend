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
      salonId: {
        type: DataTypes.UUID,
        references: {
          model: "salons",
          key: "salonId",
        },
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
