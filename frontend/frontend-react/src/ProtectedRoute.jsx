import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("token");
    const student = JSON.parse(localStorage.getItem("student") || "null");

    if (!token || !student) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(student.role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;