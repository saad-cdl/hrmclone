import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";

import leave from "./leave.model.js";
import employee from "./employee.model.js";

const leavestatus = sequelize.define("leavestatus", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  leave_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: leave,
      key: "id",
    },
  },
  approved_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: employee,
      key: "id",
    },
  },
  approved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  
});
export default leavestatus;
