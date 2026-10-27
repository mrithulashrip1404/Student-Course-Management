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

                <Link to="/login" className="navbar-link">
                    Login
                </Link>

                <Link to="/register" className="navbar-link">
                    Register
                </Link>

                <Link to="/dashboard" className="navbar-link">
                    Dashboard
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;