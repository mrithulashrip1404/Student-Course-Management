
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="home-header">
            <Link to="/" className="home-logo">
                <div className="logo-icon">✦</div>

                <div>
                    <h2>CourseBuddy</h2>
                    <p>Learn. Grow. Succeed.</p>
                </div>
            </Link>

            <nav className="home-nav">
                <Link to="/">Home</Link>

                <Link to="/courses">Courses</Link>

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

                <Link className="register-button" to="/register">
                    Get Started
                </Link>
            </nav>
        </header>
    );
}

export default Navbar;
