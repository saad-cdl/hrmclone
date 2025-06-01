import employee from "../models/employee.model.js";
import leave from "../models/leave.model.js";
import asynchandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ErrorHandling.js";
import ApiResponse from "../utils/ResponseHandling.js";
import { Op } from 'sequelize';
import sequelize from '../database/index.js';
import { Sequelize } from 'sequelize';

const getTotalEmployees = asynchandler(async (req, res, next) => {
    console.log("GET /hrms/employee/total endpoint hit");
    try {
        const totalEmployees = await employee.count();
        if (totalEmployees === 0) {
            throw new ApiError(404, "No employees found");
        }
        res.status(200).json(new ApiResponse(200, totalEmployees, "Total Employees Count"));
    } catch (error) {
        console.error("Error in getTotalEmployees:", error.message);
        next(error);
    }
});

const getTotalEmployeesOnLeave = asynchandler(async (req, res, next) => {
    console.log("GET /hrms/employee/on-leave/:id endpoint hit");
    console.log("Sequelize Op:", Op);

    try {
        const employeesOnLeave = await employee.count({
            where: {
                [Op.or]: [ 
                    { paid_leave: { [Op.gt]: 0 } }, 
                    { unpaid_leave: { [Op.gt]: 0 } }
                ]
            }
        });

        if (employeesOnLeave === 0) {
            throw new ApiError(404, "No employees are currently on leave");
        }

        res.status(200).json(new ApiResponse(200, employeesOnLeave, "Total Employees on Leave"));
    } catch (error) {
        console.error("Error in getTotalEmployeesOnLeave:", error.message);
        next(error);
    }
});


const getAllPendingLeaveRequests = asynchandler(async (req, res, next) => {
    console.log("GET /hrms/employee/pending-leaves endpoint hit");
    try {
        const pendingLeaveRequests = await employee.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { paid_leave: { [Sequelize.Op.gt]: 0 } },
                    { unpaid_leave: { [Sequelize.Op.gt]: 0 } } 
                ]
            }
        });

        if (!pendingLeaveRequests.length) {
            throw new ApiError(404, "No pending leave requests found");
        }

        res.status(200).json(new ApiResponse(200, pendingLeaveRequests, "Pending Leave Requests"));
    } catch (error) {
        console.error("Error in getAllPendingLeaveRequests:", error.message);
        next(error);
    }
});


export {
    getTotalEmployees,
    getTotalEmployeesOnLeave,
    getAllPendingLeaveRequests,
};
