"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Salon, User }) {
      // define association here
      this.belongsTo(Salon, {
        foreignKey: "salonId",
        onDelete: "cascade",
      });
      this.belongsTo(User, {
        foreignKey: "userId",
        onDelete: "cascade",
      });
    }
  }
  Review.init(
    {
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "userId",
        },
      },
      salonId: {
        type: DataTypes.UUID,
        references: {
          model: "salons",
          key: "salonId",
        },
      },
      rating: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
