import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";

const logo = sequelize.define("logo", {
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
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default logo;