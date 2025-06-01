import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
const user = sequelize.define(
  "user",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshtoken: {
      type: DataTypes.STRING,
    },
    forgetpassword: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    hooks: {
      beforeSave: async (user, options) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
      beforeUpdate: async (user, options) => {
        if (user.changed("password")) {
          console.log(user.password);
          user.password = await bcrypt.hash(user.password, saltRounds);
          console.log(user.password);
        }
      },
    },
  }
);

export default user;
