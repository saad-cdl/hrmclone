import leave from "../models/leave.model.js";
import leavestatus from "../models/leavestatus.model.js";
import employee from "../models/employee.model.js";
import asynchandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ErrorHandling.js";
import ApiResponse from "../utils/ResponseHandling.js";
import sequelize from "../database/index.js";

const applyforleave = asynchandler(async (req, res, next) => {
  try {
    const {
      // employee_id,
      leave_type,
      start_date,
      end_date,
      title,
      description,
    } = req.body;

    if (
      // !employee_id ||
      !leave_type ||
      !start_date ||
      !end_date ||
      !description ||
      !title
    ) {
      throw new ApiError(
        400,
        "Please provide all required fields: employee_id, leave_type, start_date, end_date, description, title"
      );
    }
    const employee_id = req.user.id;

    const employeeExists = await employee.findByPk(employee_id);
    if (!employeeExists) {
      throw new ApiError(404, "Employee Not Found");
    }
    if (leave_type !== "Paid" && leave_type !== "Unpaid") {
      throw new ApiError(400, "Leave type must be either Paid or Unpaid");
    }
    const date_from = new Date(start_date);
    const date_to = new Date(end_date);

    if (date_from > date_to) {
      throw new ApiError(400, "Start date must be before end date");
    }
    if (leave_type === "Paid") {
      if (employeeExists.paid_leave === 0) {
        throw new ApiError(400, "Employee has no paid leaves left");
      }
      employeeExists.paid_leave -=
        (date_to - date_from) / (1000 * 60 * 60 * 24);
    }
    if (leave_type === "Unpaid") {
      if (employeeExists.unpaid_leave === 0) {
        throw new ApiError(400, "Employee has no unpaid leaves left");
      }
      employeeExists.unpaid_leave -=
        (date_to - date_from) / (1000 * 60 * 60 * 24);
    }
    const emp = await employeeExists.save();
    if (!emp) {
      throw new ApiError(500, "Error saving employee");
    }
    const newLeave = await leave.create({
      employee_id,
      title,
      description,
      date_from,
      date_to,
    });
    if (!newLeave) {
      throw new ApiError(500, "Error creating leave");
    }
    res
      .status(201)
      .json(new ApiResponse(201, "Leave Created", newLeave, newLeave.id));
  } catch (error) {
    next(error);
  }
});

// Employee can view their leaves
const getleaves = asynchandler(async (req, res, next) => {
  try {
    // Find the employee record for the logged-in user
    const employeeRecord = await employee.findOne({
      where: { user: req.user.id },
    });

    if (!employeeRecord) {
      throw new ApiError(404, "Employee not found");
    }

    // Find all leaves for the employee
    const leaves = await leave.findAll({
      where: { employee_id: employeeRecord.id },
    });

    if (!leaves || leaves.length === 0) {
      throw new ApiError(404, "No leaves found");
    }

    let leaves_obj = [];

    // Iterate through leave IDs and fetch statuses one by one
    for await (const leave of leaves) {
      const leaveStatus = await leavestatus.findOne({
        where: { leave_id: leave.id },
      });

      // If leaveStatus is not found, set it as "Pending" or handle it accordingly
      const status = leaveStatus ? (leaveStatus.approved ? "Approved" : "Pending") : "Pending";

      // Add the leave and its status to the leaves_obj array
      leaves_obj.push({
        leave_id: leave.id,
        leave_type: leave.leave_type,  // Assuming leave has a type
        from_date: leave.from_date,    // Assuming leave has a from_date
        to_date: leave.to_date,        // Assuming leave has a to_date
        status,                        // Leave status or default
      });
    }

    // Send the response with the leaves and their statuses
    res.status(200).json(new ApiResponse(200, "Leaves found", leaves_obj));
  } catch (error) {
    next(error);
  }
});


// Employee can cancel their leaves
const cancelleave = asynchandler(async (req, res, next) => {
  try {
    const { leave_id } = req.body;
    if (!leave_id) {
      throw new ApiError(400, "Please provide leave_id");
    }

    const employeeRecord = await employee.findOne({
      where: { user: req.user.id },
    });
    if (!employeeRecord) {
      throw new ApiError(404, "Employee not found");
    }

    const leaveRecord = await leave.findOne({
      where: { id: leave_id, employee_id: employeeRecord.id },
    });
    if (!leaveRecord) {
      throw new ApiError(404, "Leave not found");
    }

    const leaveStatus = await leavestatus.findOne({
      where: { leave_id: leave_id },
    });
    if (!leaveStatus) {
      throw new ApiError(404, "Leave status not found");
    }

    if (leaveStatus.approved) {
      throw new ApiError(400, "Leave already approved");
    }

    const deletedLeave = await leaveRecord.destroy();
    if (!deletedLeave) {
      throw new ApiError(500, "Error deleting leave");
    }

    if (leaveRecord.leave_type === "Paid") {
      employeeRecord.paid_leave +=
        (leaveRecord.date_to - leaveRecord.date_from) / (1000 * 60 * 60 * 24);
    } else {
      employeeRecord.unpaid_leave +=
        (leaveRecord.date_to - leaveRecord.date_from) / (1000 * 60 * 60 * 24);
    }
    const resp = await employeeRecord.save();
    if (!resp) {
      throw new ApiError(500, "Error saving employee");
    }
    res.status(200).json(new ApiResponse(200, "Leave deleted"));
  } catch (error) {
    next(error);
  }
});

// Admin can approve or reject leaves
const approveleave = asynchandler(async (req, res, next) => {
  try {
    const { leave_id, approved } = req.body;
    if (!leave_id || approved === undefined) {
      throw new ApiError(400, "Please provide leave_id and approved");
    }

    const employeeRecord = await employee.findOne({
      where: { user: req.user.id },
    });
    if (!employeeRecord) {
      throw new ApiError(404, "Employee not found");
    }

    if (!employeeRecord.admin) {
      throw new ApiError(403, "Employee is not an admin");
    }

    const leaveRecord = await leave.findOne({
      where: { id: leave_id },
    });
    if (!leaveRecord) {
      throw new ApiError(404, "Leave not found");
    }

    const leaveStatus = await leavestatus.findOne({
      where: { leave_id: leave_id },
    });
    if (!leaveStatus) {
      throw new ApiError(404, "Leave status not found");
    }

    if (leaveStatus.approved) {
      throw new ApiError(400, "Leave already approved");
    }

    leaveStatus.approved = approved;
    leaveStatus.approved_by = employeeRecord.id;

    const updatedStatus = await leaveStatus.save();
    if (!updatedStatus) {
      throw new ApiError(500, "Error updating leave status");
    }

    if (approved) {
      res.status(200).json(new ApiResponse(200, "Leave approved"));
    } else {
      res.status(200).json(new ApiResponse(200, "Leave rejected"));
    }
  } catch (error) {
    next(error);
  }
});

export { applyforleave, getleaves, cancelleave, approveleave };
