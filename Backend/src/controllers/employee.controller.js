import employee from "../models/employee.model.js";
import user from "../models/user.model.js";
import address from "../models/address.model.js";
import asynchandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ErrorHandling.js";
import ApiResponse from "../utils/ResponseHandling.js";
import organization from "../models/organization.model.js";
import deptemployee from "../models/deptemployee.model.js";
import bcrypt from "bcrypt";

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

const create_employee = asynchandler(async (req, res, next) => {
  try {
    if (req.admin === false) {
      throw new ApiError(401, "Unauthorized - Only Admin can create employee");
    }

    const {
      phone,
      admin,
      Salary,
      address,
      organization,
      role,
      location,
      paidleave,
      unpaidleave,
      username,
      password,
    } = req.body;

    // Ensure all required fields are present
    if (
      !username ||
      !password ||
      !phone ||
      admin == null ||
      !Salary ||
      !organization ||
      !role
    ) {
      throw new ApiError(
        400,
        "Please fill all the required fields: user_id, phone, admin, Salary, role"
      );
    }
    let userexist = await user.findOne({ where: { email: username } });
    if (!userexist) {
      userexist = await user.create({
        name: username,
        email: username,
        password: password,
      });
    }
    if (!userexist) {
      throw new ApiError(500, "Failed to create new user");
    }
    const isuseremployee = await employee.findOne({
      where: { user: userexist.id },
    });
    if (isuseremployee) {
      throw new ApiError(400, "Employee already exists");
    }

    const newUserData = {
      user: userexist.id,
      phone: phone,
      paid_leave: paidleave ?? 10,
      unpaid_leave: unpaidleave ?? 5,
      admin: admin,
      role: role,
      location: location ?? "Hybrid",
      Salary: Salary,
      organization: organization,
    };

    if (address) {
      newUserData.address = address;
    }

    const newEmployee = await employee.create(newUserData);

    if (newEmployee) {
      userexist.password = undefined;
      newEmployee.user = userexist;
      res.status(201).json(new ApiResponse(200, newEmployee, "User Created"));
    } else {
      throw new ApiError(500, "Failed to create new employee");
    }
  } catch (error) {
    next(error);
  }
});

const update_employee = asynchandler(async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log("User ID", user_id);
    const {
      phone,
      admin,
      Salary,
      address_id,
      role,
      location,
      paidleave,
      unpaidleave,
    } = req.body;

    if (!user_id) {
      throw new ApiError(400, "Please provide user_id");
    }
    const userExists = await employee.findOne({ where: { user: user_id } });
    if (!userExists) {
      throw new ApiError(400, "Employee does not exist");
    }
    // console.log("User ID", userExists);
    // res.status(201).json(new ApiResponse(200, userExists, "User Found"));
    let addressexsist = null;
    if (address_id) {
      addressexsist = await address.findOne({
        where: { id: address_id },
      });
    }
    const newUserData = {
      phone: phone,
      paid_leave: paidleave ?? 10,
      unpaid_leave: unpaidleave ?? 5,
      admin: admin,
      role: role,
      location: location ?? "Hybrid",
      Salary: Salary,
    };

    if (addressexsist) {
      newUserData.address = address;
    }

    const updatedUser = await employee.update(newUserData, {
      where: { id: user_id },
    });

    if (updatedUser) {
      res.status(201).json(new ApiResponse(200, updatedUser, "User Updated"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const delete_employee = asynchandler(async (req, res, next) => {
  try {
    if (req.admin === false) {
      throw new ApiError(401, "Unauthorized");
    }
    const { user_id } = req.params;

    if (!user_id) {
      throw new ApiError(400, "Please provide user_id");
    }

    const userExists = await employee.findOne({ where: { id: user_id } });
    if (!userExists) {
      throw new ApiError(400, "Employee does not exist");
    }

    const deletedUser = await employee.destroy({ where: { id: user_id } });

    if (deletedUser) {
      const deleteuser = await user.destroy({ where: { id: user_id } });
      if (deleteuser) {
        res.status(201).json(new ApiResponse(200, {}, "Employee Deleted"));
      }
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getemployee = asynchandler(async (req, res, next) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      throw new ApiError(400, "Please provide user_id");
    }

    const userExists = await employee.findOne({ where: { id: user_id } });
    if (!userExists) {
      throw new ApiError(400, "Employee does not exist");
    }
    const userdetails = await user.findOne({ where: { id: userExists.user } });
    userdetails.password = undefined;
    userdetails.refreshtoken = undefined;
    userExists.user = userdetails;
    res.status(201).json(new ApiResponse(200, userExists, "Employee Found"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getoranizationemployee = asynchandler(async (req, res, next) => {
  try {
    const { organization } = req.params;
    // console.log("HElll");
    const emp = await employee.findAll({
      where: { organization: organization },
    });
    // console.log("Emp", emp);
    if (emp.length == 0) {
      // res.json(400, "No employee found");
      res.status(200).json(new ApiResponse(200, emp, "No Employee Found"));
    }
    // res.status(201).json(new ApiResponse(200, emp, "Employee Found"));
    const empdata = [];
    for (let i = 0; i < emp.length; i++) {
      const userdetails = await user.findOne({ where: { id: emp[i].user } });
      console.log("User Details", userdetails.name);
      userdetails.password = undefined;
      userdetails.refreshtoken = undefined;
      emp[i].user = userdetails;
      emp[i].username = userdetails.name;
      empdata.push(emp[i]);
    }
    res.status(201).json(new ApiResponse(200, empdata, "Employee Found"));
  } catch (error) {
    next(500, error.message);
  }
});

export {
  getoranizationemployee,
  create_employee,
  update_employee,
  delete_employee,
  getemployee,
};
