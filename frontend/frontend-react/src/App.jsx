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
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import ManageCourses from "./pages/ManageCourses";
import ProtectedRoute from "./ProtectedRoute";
import StudentLogin from "./pages/StudentLogin";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            <Route path="/dashboard" element={<Dashboard />} />

            {/* Student Routes */}
            <Route
                path="/student-dashboard"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />

            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />

            <Route
                path="/my-courses"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <MyCourses />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/progress"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <Progress />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/notifications"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <Notifications />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <Settings />
                    </ProtectedRoute>
                }
            />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Admin Routes */}
            <Route
                path="/admin-dashboard"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/manage-courses"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <ManageCourses />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;