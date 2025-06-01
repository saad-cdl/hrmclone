import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import {
  ErrorHandlerMiddleWare,
  ServerErrorMiddleWare,
} from "./middlewares/globalerror.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "50kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "50kb",
  })
);
app.use(cookieparser());

app.use(express.static("public"));

import UserRouter from "./routes/user.routes.js";
import LanguageRouter from "./routes/language.routes.js";
import LogoRouter from "./routes/logo.routes.js";
import contactRouter from "./routes/contact.routes.js";
import currencyRouter from "./routes/currency.routes.js";
import AddressRouter from "./routes/address.routes.js";
import DepartmentRouter from "./routes/Department.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import empdeptrouter from "./routes/empdept.routes.js";
import organizationRouter from "./routes/organization.routes.js";
import attendanceRouter from "./routes/attendance.routes.js";
import employeestatsRouter from "./routes/EmployeeStats.routes.js";
import LeaveRouter from "./routes/leave.routes.js";

app.use("/HRMS/api", UserRouter);
app.use("/HRMS/api", LanguageRouter);
app.use("/HRMS/api", LogoRouter);
app.use("/HRMS/api", contactRouter);
app.use("/HRMS/api", currencyRouter);
app.use("/HRMS/api", AddressRouter);
app.use("/HRMS/api", DepartmentRouter);
app.use("/HRMS/api", employeeRouter);
app.use("/HRMS/api", empdeptrouter);
app.use("/HRMS/api", organizationRouter);
app.use("/HRMS/api", attendanceRouter);
app.use("/HRMS/api", employeestatsRouter);
app.use("/HRMS/api", LeaveRouter);


app.use(ErrorHandlerMiddleWare);

export default app;
