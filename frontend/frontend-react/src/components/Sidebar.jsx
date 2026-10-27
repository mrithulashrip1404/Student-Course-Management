import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon">✦</div>

                <div>
                    <h2>CourseBuddy</h2>
                    <p>Learn. Grow. Succeed.</p>
                </div>
            </div>

            <nav className="sidebar-nav">
                <Link
                    to="/student-dashboard"
                    className={
                        location.pathname === "/student-dashboard"
                            ? "active"
                            : ""
                    }
                >
                    <span>⌂</span>
                    Dashboard
                </Link>

                <Link to="/courses">
                    <span>▣</span>
                    Courses
                </Link>

                <Link to="/my-courses">
                    <span>♡</span>
                    My Courses
                </Link>

                <Link to="/progress">
                    <span>◔</span>
                    Progress
                </Link>

                <Link to="/notifications">
                    <span>♢</span>
                    Notifications
                    <b>3</b>
                </Link>
            </nav>

            <div className="sidebar-bottom">
                <div className="sidebar-profile">
                    <div className="profile-avatar">P</div>

                    <div>
                        <strong>Priya</strong>
                        <small>Student</small>
                    </div>
                </div>

                <Link to="/profile">
                    <span>⚙</span>
                    Profile
                </Link>

                <Link to="/login">
                    <span>↪</span>
                    Logout
                </Link>
            </div>
        </aside>
    );
}

export default Sidebar;