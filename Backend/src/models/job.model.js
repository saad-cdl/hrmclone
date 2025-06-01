import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";
import employee from "./employee.model.js";
import interview from "./Interview.model.js";
import organization from "./organization.model.js";

const job = sequelize.define("job", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
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
  candidatename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recruiter: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: employee,
      key: "id",
    },
  },
  interview: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: interview,
      key: "id",
    },
  },
});
export default job;