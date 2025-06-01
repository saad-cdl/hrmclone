import sequilize from "../database/index.js";
import { DataTypes } from "sequelize";
import employee from "./employee.model.js";

const leave = sequilize.define("leave", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: employee,
      key: "id",
    },
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_from: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_to: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  document: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default leave;
