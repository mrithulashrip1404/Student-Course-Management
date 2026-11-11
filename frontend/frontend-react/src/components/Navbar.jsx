
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                ✦ CourseBuddy
            </Link>

            <div className="navbar-links">
                <Link to="/" className="navbar-link">
                    Home
                </Link>

                <Link to="/courses" className="navbar-link">
                    Courses
                </Link>

                <div className="navbar-dropdown">
                    <button
                        type="button"
                        className="navbar-link dropdown-trigger"
                        aria-haspopup="true"
                    >
                        Login <span>▾</span>
                    </button>

                    <div className="navbar-dropdown-menu">
                        <Link to="/student-login">Student Login</Link>
                        <Link to="/admin-login">Admin Login</Link>
                    </div>
                </div>

                <div className="navbar-dropdown">
                    <button
                        type="button"
                        className="navbar-link dropdown-trigger"
                        aria-haspopup="true"
                    >
                        Register <span>▾</span>
                    </button>

                    <div className="navbar-dropdown-menu">
                        <Link to="/register">Student Register</Link>
                        <Link to="/admin-register">Admin Register</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
