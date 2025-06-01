import department from "../models/department.model.js";
import asynchandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ErrorHandling.js";
import ApiResponse from "../utils/ResponseHandling.js";

const createDepartment = asynchandler(async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      throw new ApiError(400, "Name  is required");
    }
    const newDepartment = await department.create({
      name,
      description,
    });
    if (!newDepartment) {
      res
        .status(500)
        .json(new ApiError(500, null, "Error Creating Department"));
    }
    res
      .status(201)
      .json(new ApiResponse(200, newDepartment, "Department Created"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getDepartments = asynchandler(async (req, res, next) => {
  try {
    const departmentList = await department.findAll();
    if (departmentList) {
      res
        .status(200)
        .json(new ApiResponse(200, departmentList, "Department List"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getDepartmentByID = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const departmentList = await department.findOne({ where: { id } });
    if (departmentList) {
      res
        .status(200)
        .json(new ApiResponse(200, departmentList, "Department List"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const updateDepartment = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name) {
      throw new ApiError(400, "Name is required");
    }
    const updateDepartment = await department.update(
      {
        name,
        description,
      },
      { where: { id } }
    );
    if (!updateDepartment) {
      res
        .status(500)
        .json(new ApiError(500, null, "Error Updating Department"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, updateDepartment, "Department Updated"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const deleteDepartment = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteDepartment = await department.destroy({ where: { id } });
    if (!deleteDepartment) {
      res
        .status(500)
        .json(new ApiError(500, null, "Error Deleting Department"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, deleteDepartment, "Department Deleted"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const addemployee = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { employee_id } = req.body;
    const employee = await employee.findOne({ where: { id: employee_id } });
    if (!employee) {
      res.status(404).json(new ApiError(404, null, "Employee Not Found"));
    }

    const addEmployee = await department.update(
      {
        employee: employee,
      },
      { where: { id } }
    );
    if (!addEmployee) {
      res.status(500).json(new ApiError(500, null, "Error Adding Employee"));
    }
    res.status(200).json(new ApiResponse(200, addEmployee, "Employee Added"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

//Check Before Use
const removeemployee = asynchandler(async (req, res, next) => {
  try {
    const { id, employee_id } = req.params;
    const employee = await employee.findOne({ where: { id: employee_id } });
    if (!employee) {
      res.status(404).json(new ApiError(404, null, "Employee Not Found"));
    }

    const removeEmployee = await department.update(
      {
        employee: null,
      },
      { where: { id, employee } }
    );
    if (!removeEmployee) {
      res.status(500).json(new ApiError(500, null, "Error Removing Employee"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, removeEmployee, "Employee Removed"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});
export {
  createDepartment,
  getDepartments,
  getDepartmentByID,
  updateDepartment,
  deleteDepartment,
  addemployee,
  removeemployee,
};
