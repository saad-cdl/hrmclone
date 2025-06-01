import { Router } from "express";
import {
  createDepartment,
  addemployee,
  getDepartments,
  getDepartmentByID,
  updateDepartment,
  removeemployee,
  deleteDepartment,
} from "../controllers/Department.controller.js";
import AuthenticateToken from "../middlewares/Authenticate_token.js";

const DepartmentRouter = Router();

DepartmentRouter.route("/department").post(AuthenticateToken, createDepartment);
DepartmentRouter.route("/department").get(AuthenticateToken, getDepartments);
DepartmentRouter.route("/department/:id").get(
  AuthenticateToken,
  getDepartmentByID
);
DepartmentRouter.route("/department/:id").put(
  AuthenticateToken,
  updateDepartment
);
DepartmentRouter.route("/department/:id").delete(
  AuthenticateToken,
  deleteDepartment
);
DepartmentRouter.route("/department/:id/employee").post(
  AuthenticateToken,
  addemployee
);
//Check Logic and Test before use
DepartmentRouter.route("/department/:id/employee/:employee_id").delete(
  AuthenticateToken,
  removeemployee
);

export default DepartmentRouter;
