import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";
import employee from "./employee.model.js";

const interview = sequelize.define("interview", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  CandidateName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interviewer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: employee,
      key: "id",
    },
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  ZoomLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default interview;
