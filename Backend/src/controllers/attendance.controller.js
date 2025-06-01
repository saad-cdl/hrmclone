import attendance from "../models/attendance.model.js";
import employee from "../models/employee.model.js";
import asynchandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ErrorHandling.js";
import ApiResponse from "../utils/ResponseHandling.js";
// import { DATE } from "sequelize";
// import emp_attendance from "../models/employeeattendance.js";

const createAttendance = asynchandler(async (req, res, next) => {
  try {
    if (req.admin === false) {
      throw new ApiError(401, "Unauthorized- Admin Only");
    }
    const { employee_id, check_in, check_out, date } = req.body;

    if (!employee_id) {
      throw new ApiError(
        400,
        "Please provide all required fields: employee_id, check_in"
      );
    }

    const employeeExists = await employee.findByPk(employee_id);
    if (!employeeExists) {
      throw new ApiError(404, "Employee Not Found");
    }
    const data = {
      employee_id: employee_id,
      date: date || DATE.now(),
    };

    if (check_in) {
      data.checkin = check_in;
    }
    if (check_out) {
      data.checkout = check_out;
    }
    const newAttendance = await attendance.create({ data });

    if (newAttendance) {
      await emp_attendance.create({
        employee_id: employee_id,
        attendance_id: newAttendance.id,
      });
    }
    res
      .status(201)
      .json(new ApiResponse(201, "Attendance Created", newAttendance));
  } catch (error) {
    next(error);
  }
});

const check_in_attendance = asynchandler(async (req, res, next) => {
  try {
    let { checkin } = req.body;
    console.log("checkin", checkin);

    // Convert checkin time from UTC to your desired time zone
    const checkinLocal = new Date(checkin).toLocaleString("en-US", {
      timeZone: "Asia/Karachi",
    });

    const employee_id = await employee.findOne({
      where: { user: req.user.id },
    });

    if (!employee_id) {
      throw new ApiError(
        400,
        "Please provide all required fields: employee_id, check_in"
      );
    }

    const date = new Date();
    const attendanceExists = await attendance.findOne({
      employee_id: employee_id.id,
      date: date.toDateString(),
    });
    if (attendanceExists) {
      throw new ApiError(400, "You have already checked in for today");
    }
    let newAttendance;
    if (!attendanceExists) {
      newAttendance = await attendance.create({
        checkin: checkinLocal, // Use the converted local time
        date: date.toDateString(),
        employee_id: employee_id.id,
      });
    }

    res
      .status(201)
      .json(new ApiResponse(201, "Attendance Created", newAttendance));
  } catch (error) {
    next(error);
  }
});
const check_out_attendance = asynchandler(async (req, res, next) => {
  try {
    const { checkout } = req.body;

    // Find the employee based on the logged-in user
    const employee_id = await employee.findOne({
      where: { user: req.user.id },
    });

    if (!employee_id) {
      throw new ApiError(400, "Employee not found");
    }

    // Get the current date in local time
    const currentDate = new Date().toDateString(); // Local date for comparison

    // Find attendance record for the employee on the current date
    const attendanceExists = await attendance.findOne({
      where: {
        employee_id: employee_id.id,
        date: currentDate, // Match attendance based on the current date
      },
    });

    if (!attendanceExists) {
      throw new ApiError(
        400,
        "Attendance record not found for today. Please check in first."
      );
    }

    if (!attendanceExists.checkin) {
      throw new ApiError(400, "Please check in before checking out.");
    }

    if (attendanceExists.checkout) {
      throw new ApiError(400, "You have already checked out for today.");
    }

    // Check out logic
    attendanceExists.checkout = checkout; // Store checkout time

    // Save the updated attendance record
    await attendanceExists.save(); // Persist the changes in the database

    res
      .status(200)
      .json(new ApiResponse(200, "Checked out successfully", attendanceExists));
  } catch (error) {
    next(error);
  }
});

const getAttendance = asynchandler(async (req, res, next) => {
  try {
    const employee_id = await employee.findOne({
      where: { user: req.user.id },
    });
    if (!employee_id) {
      throw new ApiError(404, "Employee Not Found");
    }
    const attendanceList = await attendance.findAll({
      where: { employee_id: employee_id.id },
    });
    if (!attendanceList) {
      throw new ApiError(404, "No Attendance Found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, "Attendance List", attendanceList));
  } catch (error) {
    next(error);
  }
});

const get_attendance_by_id = asynchandler(async (req, res, next) => {
  try {
    const attendance_id = req.params.id;
    const attendanceExists = await attendance.findOne({
      id: attendance_id,
      // date: DATE.now(),
    });
    if (!attendanceExists) {
      throw new ApiError(404, "No Attendance Found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, "Attendance Found", attendanceExists));
  } catch (error) {
    next(error);
  }
});

const updateAttendance = asynchandler(async (req, res, next) => {
  try {
    const { checkin, checkout, date } = req.body;
    const attendance_id = req.params.id;
    const employee_id = await employee.findOne({
      where: { user: req.user.id },
    });
    const attendanceExists = await attendance.findOne({
      employee_id: employee_id.id,
      date: DATE.now(),
    });
    if (!attendanceExists) {
      throw new ApiError(404, "No Attendance Found");
    }
    if (checkin) {
      attendanceExists.checkin = checkin;
    }
    if (checkout) {
      attendanceExists.checkout = checkout;
    }
    if (date) {
      attendanceExists.date = date;
    }
    await attendanceExists.save();
    res
      .status(200)
      .json(new ApiResponse(200, "Attendance Updated", attendanceExists));
  } catch (error) {
    next(error);
  }
});

const deleteAttendance = asynchandler(async (req, res, next) => {
  try {
    const attendance_id = req.params.id;
    const employee_id = await employee.findOne({
      where: { user: req.user.id },
    });
    const attendanceExists = await attendance.findOne({
      employee_id: employee_id.id,
      date: DATE.now(),
    });
    if (!attendanceExists) {
      throw new ApiError(404, "No Attendance Found");
    }
    await attendanceExists.destroy();
    res
      .status(200)
      .json(new ApiResponse(200, "Attendance Deleted", attendanceExists));
  } catch (error) {
    next(error);
  }
});

export {
  createAttendance,
  check_in_attendance,
  check_out_attendance,
  getAttendance,
  updateAttendance,
  deleteAttendance,
  get_attendance_by_id,
};
