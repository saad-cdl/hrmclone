import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";

// import employee from "./employee.model.js";
const department = sequelize.define("department", {
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
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // employee: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  //   references: {
  //     model: employee,
  //     key: "id",
  //   },
  // },
});

export default department;
