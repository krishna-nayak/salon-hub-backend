"use strict";
const { Model } = require("sequelize");
const salonservice = require("./salonservice");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Appointment, SalonService, Salon }) {
      // define association here
      this.belongsToMany(SalonService, {
        through: Appointment,
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      this.hasMany(Appointment, { foreignKey: "userId" });

      this.hasOne(Salon, {
        foreignKey: "userId", // This will be the foreign key in the Salon table
        onDelete: "CASCADE",
      });
    }
    // @Override
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a email" },
          notEmpty: { msg: "email must not be empty" },
          isEmail: { msg: "Must be a valid email address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a password" },
          notEmpty: { msg: "password must not be empty" },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a role" },
          notEmpty: { msg: "role must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
