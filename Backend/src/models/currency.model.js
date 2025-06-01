import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";

const currency = sequelize.define("currency", {
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
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default currency;