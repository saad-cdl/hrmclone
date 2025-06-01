// import employee from "../models/employee.model.js";
import user from "../models/user.model.js";
import asynchandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ErrorHandling.js";
import ApiResponse from "../utils/ResponseHandling.js";
import GenerateToken from "../utils/GenerateToken.js";
import bcrypt from "bcrypt";
import keygen from "keygen";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import employee from "../models/employee.model.js";

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

const Signup = asynchandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      throw new ApiError(400, "Please fill all the fields");
    }
    const userexsist = await user.findOne({ where: { email } });
    if (userexsist) {
      throw new ApiError(400, "User already exists");
    }

    const newuser = await user.create({
      name: name,
      email: email,
      password: password,
    });

    if (newuser) {
      const newemp = await employee.create({
        user: newuser.id,
        phone: "",
        paid_leave: 100,
        unpaid_leave: 100,
        admin: true,
        role: "Owner",
        location: "Hybrid",
        Salary: 0,
      });
      if (!newemp) {
        throw new ApiError(500, "Employee Creation Failed");
      }
      newuser.password = undefined;
      const [access_token, refresh_token] = GenerateToken(newuser);
      if (refresh_token === null || access_token === null) {
        throw new ApiError(500, "Token Generation Failed");
      }
      const addrefreshtoken = await user.update(
        { refreshtoken: refresh_token },
        { where: { id: newuser.id } }
      );
      if (!addrefreshtoken) {
        throw new ApiError(500, "Token Generation Failed");
      }
      res.cookie("refresh-token", refresh_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600 * 100000,
        path: "/",
      });
      res.cookie("access-token", access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600 * 1000,
      });
      newemp.user = newuser;
      res.status(201).json(new ApiResponse(200, newemp, "User Created"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getalluser = asynchandler(async (req, res, next) => {
  try {
    const users = await user.findAll();
    if (users) {
      res.status(200).json(new ApiResponse(200, users, "Users Found"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getuser = asynchandler(async (req, res, next) => {
  try {
    const id = req.user.id;
    const users = await user.findOne({ where: { id } });
    users.password = undefined;
    users.refreshtoken = undefined;
    const emp = await employee.findOne({ where: { user: id } });
    if (users) {
      emp.user = users;
      res.status(200).json(new ApiResponse(200, emp, "User Found"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const signin = asynchandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const token = req.cookies["access-token"];
      const refresh_token = req.cookies["refresh-token"];

      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await user.findOne({ where: { id: decoded.id } });
        if (req)
          res
            .status(200)
            .json(new ApiResponse(200, req.user, "User Logged In"));
      }
      if (refresh_token) {
        console.log("refresh token");
        const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
        const userexist = await user.findOne({ where: { id: decoded.id } });
        if (!userexist || userexist.refreshtoken !== refresh_token) {
          res.clearCookie["refresh-token"];
          throw new ApiError(401, "Unauthorized- User Does Not Exsist");
        }
        const [newAccessToken] = GenerateToken(userexist);
        if (!newAccessToken) {
          throw new ApiError(500, "Token Generation Failed");
        }
        res.cookie("access-token", newAccessToken, {
          httpOnly: true,
          secure: true,
          maxAge: 3600 * 1000,
        });
        req.user = userexist;
        res
          .status(200)
          .json(new ApiResponse(200, req.user, "User Logged In with refresh"));
      }
      throw new ApiError(
        400,
        "Please fill all the fields required feilds are email and password"
      );
    }
    const userexsist = await user.findOne({ where: { email } });
    if (!userexsist) {
      throw new ApiError(400, "User does not exists");
    }
    const passcorrect = await bcrypt.compare(password, userexsist.password);
    if (!passcorrect) {
      throw new ApiError(400, "Password is incorrect");
    }
    const emp = await employee.findOne({ where: { user: userexsist.id } });
    if (!emp) {
      throw new ApiError(400, "Employee does not exists");
    }
    userexsist.password = undefined;
    const [access_token, refresh_token] = GenerateToken(userexsist);
    if (refresh_token === null || access_token === null) {
      throw new ApiError(500, "Token Generation Failed");
    }
    const addrefreshtoken = await user.update(
      { refreshtoken: refresh_token },
      { where: { id: userexsist.id } }
    );
    if (!addrefreshtoken) {
      throw new ApiError(500, "Token Generation Failed");
    }
    res.cookie("refresh-token", refresh_token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600 * 100000,
      path: "/",
    });
    res.cookie("access-token", access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600 * 1000,
    });
    userexsist.refresh_token = undefined;
    emp.user = userexsist;

    res.status(200).json(new ApiResponse(200, emp, "User Logged In"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const signout = asynchandler(async (req, res, next) => {
  try {
    res.clearCookie("refresh-token", {
      path: "/",
      secure: true,
      domain: "localhost",
      sameSite: "Strict",
    });
    res.clearCookie("access-token", {
      path: "/",
      secure: true,
      domain: "localhost",
      sameSite: "Strict",
    });

    res.status(200).json(new ApiResponse(200, {}, "User Logged Out"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const updateuser = asynchandler(async (req, res, next) => {
  try {
    const id = req.user.id;
    const { name, email, password } = req.body;
    if (!(name || email)) {
      throw new ApiError(400, "Please fill all the fields");
    }
    const userexsist = await user.findOne({ where: { id } });
    if (!userexsist) {
      throw new ApiError(400, "User does not exists");
    }
    const updateduser = await user.update({ name, email }, { where: { id } });
    if (updateduser) {
      const updateduser = await user.findOne({ where: { id } });
      updateduser.password = undefined;
      updateduser.refreshtoken = undefined;
      res.status(200).json(new ApiResponse(200, updateduser, "User Updated"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const deleteuser = asynchandler(async (req, res, next) => {
  try {
    const id = req.user.id;
    const userexsist = await user.findOne({ where: { id } });
    if (!userexsist) {
      throw new ApiError(400, "User does not exists");
    }
    const deleteduser = await user.destroy({ where: { id } });
    if (deleteduser) {
      res.clearCookie("refresh-token");
      res.clearCookie("access-token");
      const emp_del = await employee.destroy({ where: { user: id } });
      if (!emp_del) {
        throw new ApiError(500, "Employee Deletion Failed, User Deleted");
      }
      res.status(200).json(new ApiResponse(200, {}, "User Deleted"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});
const forgetpassword = asynchandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new ApiError(400, "Please fill all the fields"));
    }

    const userexsist = await user.findOne({ where: { email } });
    if (!userexsist) {
      return next(new ApiError(400, "User does not exist"));
    }

    const plainKey = keygen.url(keygen.medium);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const info = transporter.sendMail({
      from: { address: process.env.GMAIL_USERNAME, name: "Codexter Labs Hrms" },
      to: email,
      subject: "Forget Password",
      text: `Your New Password key is ${plainKey}. Enter your key to reset your password.`,
    });

    if (!info) {
      return next(new ApiError(500, "Email not sent"));
    }
    const updateduser = await user.update(
      {
        forgetpassword: true,
        password: await bcrypt.hash(plainKey, saltRounds),
      },
      { where: { email: email } }
    );

    res
      .status(200)
      .json(new ApiResponse(200, ["A Key has been sent to your email"]));
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
});

const resetpassword = asynchandler(async (req, res, next) => {
  const { email, key, password } = req.body;

  if (!email || !key || !password) {
    return next(
      new ApiError(400, "Please fill all the fields: email, key, password")
    );
  }

  try {
    const userexsist = await user.findOne({ where: { email } });
    if (!userexsist) {
      return next(new ApiError(400, "User does not exist"));
    }

    const isKeyCorrect = await bcrypt.compare(key, userexsist.password);
    if (!isKeyCorrect) {
      return next(new ApiError(401, "Incorrect Key"));
    }

    const password_updated = await user.update(
      {
        forgetpassword: false,
        password: await bcrypt.hash(password, saltRounds), // This will be hashed automatically by your Sequelize hook
      },
      { where: { email: email } }
    );
    if (password_updated)
      res.status(200).json(new ApiResponse(200, "User Password Updated"));
  } catch (error) {
    return next(new ApiError(500, "Internal Server Error"));
  }
});

const isuseradmin = asynchandler(async (req, res, next) => {
  try {
    if (req.admin === true) {
      console.log("User is Admin");
      res.status(200).json(new ApiResponse(200, "User is Admin"));
    }
    res.status(200).json(new ApiResponse(400, "User is not Admin"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});
export {
  updateuser,
  Signup,
  getalluser,
  getuser,
  signin,
  signout,
  resetpassword,
  deleteuser,
  forgetpassword,
  isuseradmin,
};
