import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";

const address = sequelize.define("address", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zip_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address_line: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default address;
