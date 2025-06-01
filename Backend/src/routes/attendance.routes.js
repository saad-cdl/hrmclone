import { Router } from "express";
import {
  createAttendance,
  check_in_attendance,
  check_out_attendance,
  getAttendance,
  updateAttendance,
  deleteAttendance,
  get_attendance_by_id,
} from "../controllers/attendance.controller.js";
import AuthenticateToken from "../middlewares/Authenticate_token.js";

const attendanceRouter = Router();

attendanceRouter.post("/attendance/", AuthenticateToken, createAttendance);
attendanceRouter.post("/attendance/checkin", AuthenticateToken, check_in_attendance);
attendanceRouter.post("/attendance/checkout", AuthenticateToken, check_out_attendance);
attendanceRouter.get("/attendance/", AuthenticateToken, getAttendance);
attendanceRouter.get("/attendance/:id", AuthenticateToken, get_attendance_by_id);
attendanceRouter.put("/attendance/:id", AuthenticateToken, updateAttendance);
attendanceRouter.delete("/attendance/:id", AuthenticateToken, deleteAttendance);

export default attendanceRouter;
