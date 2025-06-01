import deptemployee from "../models/deptemployee.model.js";
import asynchandler from "../utils/AsyncHandler.js";

import ApiError from "../utils/ErrorHandling.js";
import ApiResponse from "../utils/ResponseHandling.js";

const addtodept = asynchandler(async (req, res, next) => {
  try {
    const { organization_id, employee_id, department_id } = req.body;

    if (!organization_id || !employee_id || !department_id) {
      throw new ApiError(
        400,
        "Please fill all the required fields: organization_id, employee_id, department_id"
      );
    }

    const deptemployeeExists = await deptemployee.findOne({
      where: {
        id: employee_id,
        organization_id: organization_id,
        department_id: department_id,
      },
    });
    if (deptemployeeExists) {
      throw new ApiError(400, "Department Employee already exists");
    }

    const newDeptEmployeeData = {
      organization_id: organization_id,
      employee_id: employee_id,
      department_id: department_id,
    };

    const newDeptEmployee = await deptemployee.create(newDeptEmployeeData);

    if (newDeptEmployee) {
      res
        .status(201)
        .json(
          new ApiResponse(200, newDeptEmployee, "Department Employee Created")
        );
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const removefromdept = asynchandler(async (req, res, next) => {
  try {
    const { organization_id, employee_id, department_id } = req.body;

    if (!organization_id || !employee_id || !department_id) {
      throw new ApiError(
        400,
        "Please fill all the required fields: organization_id, employee_id, department_id"
      );
    }

    const deptemployeeExists = await deptemployee.findOne({
      where: {
        id: employee_id,
        organization_id: organization_id,
        department_id: department_id,
      },
    });
    if (!deptemployeeExists) {
      throw new ApiError(400, "Department Employee does not exist");
    }

    const removedDeptEmployee = await deptemployee.destroy({
      where: {
        id: employee_id,
        organization_id: organization_id,
        department_id: department_id,
      },
    });

    if (removedDeptEmployee) {
      res
        .status(201)
        .json(
          new ApiResponse(
            200,
            removedDeptEmployee,
            "Department Employee Removed"
          )
        );
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const changedept = asynchandler(async (req, res, next) => {
  try {
    const { organization_id, employee_id, department_id } = req.body;

    if (!organization_id || !employee_id || !department_id) {
      throw new ApiError(
        400,
        "Please fill all the required fields: organization_id, employee_id, department_id"
      );
    }

    const deptemployeeExists = await deptemployee.findOne({
      where: { id: employee_id },
    });
    if (!deptemployeeExists) {
      throw new ApiError(400, "Department Employee does not exist");
    }

    const updatedDeptEmployee = await deptemployee.update(
      {
        organization_id: organization_id,
        employee_id: employee_id,
        department_id: department_id,
      },
      { where: { id: employee_id } }
    );

    if (updatedDeptEmployee) {
      res
        .status(201)
        .json(
          new ApiResponse(
            200,
            updatedDeptEmployee,
            "Department Employee Updated"
          )
        );
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getempdept = asynchandler(async (req, res, next) => {
  try {
    const { employee_id } = req.params;

    if (!employee_id) {
      throw new ApiError(400, "Please provide employee_id");
    }

    const deptemployeeExists = await deptemployee.findOne({
      where: { id: employee_id },
    });
    if (!deptemployeeExists) {
      throw new ApiError(400, "Department Employee does not exist");
    }

    res
      .status(201)
      .json(
        new ApiResponse(200, deptemployeeExists, "Department Employee Found")
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export { addtodept, removefromdept, changedept, getempdept };