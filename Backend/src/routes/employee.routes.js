import AuthenticateToken from "../middlewares/Authenticate_token.js";
import {
  create_employee,
  update_employee,
  delete_employee,
  getemployee,
  getoranizationemployee
} from "../controllers/employee.controller.js";
import { Router } from "express";

const employeeRouter = Router();

employeeRouter.post("/employee", AuthenticateToken, create_employee);
employeeRouter.put("/employee/:user_id", AuthenticateToken, update_employee);
employeeRouter.delete("/employee/:user_id", AuthenticateToken, delete_employee);
employeeRouter.get("/employee/:user_id", AuthenticateToken, getemployee);
employeeRouter.get("/employee/organization/:organization", AuthenticateToken,getoranizationemployee);

export default employeeRouter;
