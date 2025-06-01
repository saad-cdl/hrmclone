import { Router } from "express";
import {
  addtodept,
  removefromdept,
  changedept,
  getempdept,
} from "../controllers/deptemployee.controller.js";
import AuthenticateToken from "../middlewares/Authenticate_token.js";

const empdeptrouter = Router();

empdeptrouter.post("/addtodept", AuthenticateToken, addtodept);
empdeptrouter.post("/removefromdept", AuthenticateToken, removefromdept);
empdeptrouter.put("/changedept", AuthenticateToken, changedept);
empdeptrouter.get("/getempdept/:employee_id", AuthenticateToken, getempdept);

export default empdeptrouter;

