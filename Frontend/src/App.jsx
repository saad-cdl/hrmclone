import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import ForgetPassword from './components/screens/forgetPassword';
import ConfirmPassword from './components/screens/confirmPassword';
import DashboardMain from './components/employeeDashboard/dashboardMain';
import EmpDashboard from './components/employeeDashboard/empDashboard.jsx';
import EmpLeave from './components/employeeDashboard/empLeave';
import EmpAttendance from './components/employeeDashboard/empAttendance.jsx';
import EmpLeaveHistory from './components/employeeDashboard/empLeaveHistory.jsx';
import EmpAttendanceHistory from './components/employeeDashboard/empAttendanceHistory.jsx';
import HrDashMain from './components/hrDashboard/hrDashMain.jsx';
import HrDashboard from './components/hrDashboard/hrDashboard.jsx';
import HrJobDesk from './components/hrDashboard/hrJobDesk.jsx';
import HrEmployee from './components/hrDashboard/hrEmployee.jsx';
import HrLeave from './components/hrDashboard/hrLeave.jsx';
import HrAttendance from './components/hrDashboard/hrAttendance.jsx';
import HrGeneral from './components/hrDashboard/hrGeneral.jsx';
import HrPayroll from './components/hrDashboard/hrPayroll.jsx';
import HrAnnouncement from './components/hrDashboard/hrAnnouncement.jsx';
import HrProtectedroutes from './components/Protected_routes/hrProtectedroutes.jsx';
import Authenticatedprotected from './components/Protected_routes/authenticatedprotected.jsx';
import { AuthProvider } from './components/context/user.context.js';
import Employeeprotectedroutes from './components/Protected_routes/employeeprotectedroutes.jsx';

function App() {
  // Dummy user context
  const user = { name: 'Demo HR', email: 'hr@demo.com', role: 'admin' };
  const isAuthenticated = true;
  const setuser = () => {};
  const setisAuthenticated = () => {};
  const newuser = false;
  const setnewuser = () => {};
  return (
    <div>
      <AuthProvider value={{ isAuthenticated, setisAuthenticated, user, setuser, newuser, setnewuser }}>
        <Routes>
          <Route path="/" element={<Authenticatedprotected component={Login} />}></Route>
          <Route path="/login" element={<Authenticatedprotected component={Login} />}></Route>
          <Route path="/signup" element={<Authenticatedprotected component={Signup} />}></Route>
          <Route path="/forget-password" element={<Authenticatedprotected component={ForgetPassword} />}></Route>
          <Route path="/confirm-password/:email/" element={<Authenticatedprotected component={ConfirmPassword} />}></Route>
          <Route path="/emp-dboard" element={<Employeeprotectedroutes component={DashboardMain} />}>
            <Route index element={<Employeeprotectedroutes component={EmpDashboard} />} />
            <Route path="leave" element={< Employeeprotectedroutes component={EmpLeave} />} />
            <Route path="attendance" element={<Employeeprotectedroutes component={EmpAttendance} />} />
            <Route path="employee-leave-history" element={<Employeeprotectedroutes component={EmpLeaveHistory} />} />
            <Route path="employee-attendance-history" element={<Employeeprotectedroutes component={EmpAttendanceHistory} />} />
          </Route>
          <Route path="/hr-dboard" element={<HrProtectedroutes component={HrDashMain} />}>
            <Route index element={<HrProtectedroutes component={HrDashboard} />} />
            <Route path="jobdesk" element={<HrProtectedroutes component={HrJobDesk} />} />
            <Route path="employee" element={<HrProtectedroutes component={HrEmployee} />} />
            <Route path="leave" element={<HrProtectedroutes component={HrLeave} />} />
            <Route path="attendance" element={<HrProtectedroutes component={HrAttendance} />} />
            <Route path="setting/general" element={<HrProtectedroutes component={HrGeneral} />} />
            <Route path="setting/payroll" element={<HrProtectedroutes component={HrPayroll} />} />
            <Route path="setting/announcement" element={<HrProtectedroutes component={HrAnnouncement} />} />
          </Route>
        </Routes >
      </AuthProvider >
    </div >
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
