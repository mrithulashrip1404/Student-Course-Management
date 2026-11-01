
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
    return (
        <>
            <Navbar />

            <main className="auth-page login-selection-page">
                <div className="auth-card login-selection-card">
                    <div className="auth-content login-selection-content">

                        <div className="login-icon">🎓</div>

                        <h1>Welcome Back!</h1>

                        <p className="auth-subtitle">
                            Continue your journey with CourseBuddy.
                            Choose your account type to get started.
                        </p>

                        <div className="login-options">

                            <Link
                                to="/student-login"
                                className="login-option-card"
                            >
                                <div className="login-option-icon">
                                    🎓
                                </div>

                                <div className="login-option-text">
                                    <h2>Student Login</h2>
                                    <p>
                                        Access your courses, track your
                                        progress and stay updated.
                                    </p>
                                </div>

                                <span className="login-option-arrow">
                                    →
                                </span>
                            </Link>

                            <Link
                                to="/admin-login"
                                className="login-option-card"
                            >
                                <div className="login-option-icon">
                                    🛡️
                                </div>

                                <div className="login-option-text">
                                    <h2>Admin Login</h2>
                                    <p>
                                        Manage courses and oversee the
                                        CourseBuddy platform.
                                    </p>
                                </div>

                                <span className="login-option-arrow">
                                    →
                                </span>
                            </Link>

                        </div>

                        <p className="login-selection-note">
                            Your learning journey starts here.
                        </p>

                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Login;
