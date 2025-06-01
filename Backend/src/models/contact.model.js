import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";

const contact = sequelize.define("contact", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secondary_email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default contact;