import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";
import employee from "./employee.model.js";

const attendance = sequelize.define("attendance", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: employee,
      key: "id",
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  checkin: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  checkout: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  abscence: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  Geolocation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
export default attendance;
