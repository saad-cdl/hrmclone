import { Router } from "express";
import {
  applyforleave,
  getleaves,
  cancelleave,
  approveleave,
} from "../controllers/leave.controller.js";
import AuthenticateToken from "../middlewares/Authenticate_token.js";

const LeaveRouter = Router();

LeaveRouter.route("/leave").post(AuthenticateToken, applyforleave);           
LeaveRouter.route("/leave").get(AuthenticateToken, getleaves);              
LeaveRouter.route("/leave/cancel").delete(AuthenticateToken, cancelleave); 
LeaveRouter.route("/leave_approve").post(AuthenticateToken, approveleave);

export default LeaveRouter;
