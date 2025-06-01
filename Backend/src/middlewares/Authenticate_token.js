import jwt, { decode } from "jsonwebtoken";
import user from "../models/user.model.js";
import GenerateToken from "../utils/GenerateToken.js"; // Assuming you have a function to generate tokens
import employee from "../models/employee.model.js";

const AuthenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies["access-token"];
    const refresh_token = req.cookies["refresh-token"];

    if (!token) {
      console.log("No token found");
      if (!refresh_token) {
        console.log("No refresh token found");
        return res
          .status(401)
          .json({ message: "Unauthorized (no token found)" });
      }

      const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
      const userexist = await user.findOne({ where: { id: decoded.id } });
      const employee_exst = await employee.findOne({
        where: { user: userexist.id },
      });

      //   console.log(refresh_token === userexist.refreshtoken);
      if (
        (!userexist || userexist.refreshtoken !== refresh_token, !employee_exst)
      ) {
        return res
          .status(401)
          .json({ message: "Unauthorized- User Does Not Exsist" });
      }

      const [newAccessToken] = GenerateToken(userexist);
      if (!newAccessToken) {
        return res.status(500).json({ message: "Token Generation Failed" });
      }
      await res.cookie("access-token", newAccessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3600 * 1000,
      });
      req.admin = employee_exst.admin;
      console.log(req.admin);
      req.user = userexist;
      next();
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await user.findOne({ where: { id: decoded.id } });
      if (req.user === null) {
        return res
          .status(401)
          .json({ message: "Unauthorized- User Does Not Exsist" });
      }
      const employee_exst = await employee.findOne({
        where: { user: decoded.id },
      });
      if (!employee_exst) {
        throw new Error("Employee Does Not Exsist");
      }
      req.admin = employee_exst.admin;
      console.log(req.admin);
      next();
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default AuthenticateToken;
