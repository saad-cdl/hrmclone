import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";

const language = sequelize.define("language", {
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
});
export default language;
