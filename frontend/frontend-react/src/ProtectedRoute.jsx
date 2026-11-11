
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("token");
    const student = JSON.parse(localStorage.getItem("student") || "null");

    if (!token || !student) {
        return (
            <Navigate
                to={allowedRoles.includes("admin") ? "/admin-login" : "/student-login"}
                replace
            />
        );
    }

    if (!allowedRoles.includes(student.role)) {
        return (
            <Navigate
                to={student.role === "admin" ? "/admin-dashboard" : "/student-dashboard"}
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;
