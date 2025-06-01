import { Router } from "express";
import AuthenticateToken from "../middlewares/Authenticate_token.js"; 
import {
  getTotalEmployees,
  getTotalEmployeesOnLeave,
  getAllPendingLeaveRequests
} from "../controllers/EmployeeStats.controller.js";

const employeestatsRouter = Router();

employeestatsRouter.get("/employee/", AuthenticateToken, getTotalEmployees);
employeestatsRouter.get("/employee/on-leave/:id", AuthenticateToken, getTotalEmployeesOnLeave);
employeestatsRouter.get("/employee/pending-leaves/:id", AuthenticateToken, getAllPendingLeaveRequests);

export default employeestatsRouter;
