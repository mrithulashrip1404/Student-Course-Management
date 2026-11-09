import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const student = JSON.parse(localStorage.getItem("student") || "{}");
    const studentName = student.name || student.fullName || "Student";

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("student");
        navigate("/login", { replace: true });
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon">🎓</div>
                <div>
                    <h2>CourseBuddy</h2>
                    <p>Learn. Grow. Succeed.</p>
                </div>
            </div>

            <nav className="sidebar-nav">
                <Link
                    to="/student-dashboard"
                    className={isActive("/student-dashboard") ? "active" : ""}
                >
                    <span>🏠</span> Dashboard
                </Link>

                <Link
                    to="/courses"
                    className={isActive("/courses") ? "active" : ""}
                >
                    <span>📚</span> Courses
                </Link>

                <Link
                    to="/my-courses"
                    className={isActive("/my-courses") ? "active" : ""}
                >
                    <span>🎯</span> My Courses
                </Link>

                <Link
                    to="/progress"
                    className={isActive("/progress") ? "active" : ""}
                >
                    <span>📈</span> Progress
                </Link>

                <Link
                    to="/notifications"
                    className={isActive("/notifications") ? "active" : ""}
                >
                    <span>🔔</span> Notifications
                </Link>
            </nav>

            <div className="sidebar-bottom">
                <div className="sidebar-profile">
                    <div className="profile-avatar">
                        {studentName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <strong>{studentName}</strong>
                        <small>Student</small>
                    </div>
                </div>

                <Link
                    to="/profile"
                    className={isActive("/profile") ? "active" : ""}
                >
                    <span>👤</span> Profile
                </Link>

                <Link
                    to="/settings"
                    className={isActive("/settings") ? "active" : ""}
                >
                    <span>⚙️</span> Settings
                </Link>

                <button
                    type="button"
                    className="sidebar-logout"
                    onClick={handleLogout}
                >
                    <span>↪️</span> Logout
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;