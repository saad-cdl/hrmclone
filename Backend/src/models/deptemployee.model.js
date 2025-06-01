import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";
import department from "./department.model.js";
import employee from "./employee.model.js";
import organization from "./organization.model.js";

const deptemployee = sequelize.define("deptemployee", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: organization,
      key: "id",
    },
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: employee,
      key: "id",
    },
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: department,
      key: "id",
    },
  },
});

export default deptemployee;
