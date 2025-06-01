import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";
import logo from "./logo.model.js";
import contact from "./contact.model.js";
import address from "./address.model.js";
import currency from "./currency.model.js";
import language from "./language.model.js";
import department from "./department.model.js";
import employee from "./employee.model.js";

const organization = sequelize.define("organization", {
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
  logo_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: logo,
      key: "id",
    },
  },
  contact: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: contact,
      key: "id",
    },
  },
  language: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: language,
      key: "id",
    },
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // departments: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: department,
  //     key: "id",
  //   },
  // },
  address: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: address,
      key: "id",
    },
  },
  currency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: currency,
      key: "id",
    },
  },
  // ownnedby: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: employee,
  //     key: "id",
  //   },
  // },
});

export default organization;
