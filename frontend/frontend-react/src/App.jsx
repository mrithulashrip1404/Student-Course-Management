import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import Progress from "./pages/Progress";
import Notifications from "./pages/Notifications";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import ManageCourses from "./pages/ManageCourses";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route
                path="/student-dashboard"
                element={<StudentDashboard />}
            />

            <Route path="/courses" element={<Courses />} />
            <Route
                path="/courses/:id"
                element={<CourseDetails />}
            />

            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/progress" element={<Progress />} />
            <Route
                path="/notifications"
                element={<Notifications />}
            />
            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/admin-dashboard"
                element={<AdminDashboard />}
            />
            <Route
                path="/manage-courses"
                element={<ManageCourses />}
            />
        </Routes>
    );
}

export default App;