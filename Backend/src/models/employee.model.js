import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";
import address from "./address.model.js";
import user from "./user.model.js";
import organization from "./organization.model.js";

const employee = sequelize.define("employee", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: user,
      key: "id",
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: address,
      key: "id",
    },
  },
  organization: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: organization,
      key: "id",
    },
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.ENUM,
    values: ["Remote", "Onsite", "Hybrid"],
    allowNull: true,
  },
  Salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paid_leave: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unpaid_leave: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default employee;
