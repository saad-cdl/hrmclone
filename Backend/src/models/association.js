import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";

import organization from "./organization.model.js";
import employee from "./employee.model.js";
import logo from "./logo.model.js";
import contact from "./contact.model.js";
import address from "./address.model.js";
import currency from "./currency.model.js";
import language from "./language.model.js";
import department from "./department.model.js";
import leave from "./leave.model.js";
import attendance from "./attendance.model.js";
import leavestatus from "./leavestatus.model.js";
import job from "./job.model.js";
import interview from "./Interview.model.js";
import announcement from "./announcement.model.js";

const syncModels = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Models synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
};

export default syncModels;
