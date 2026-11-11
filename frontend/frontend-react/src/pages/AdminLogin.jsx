
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginStudent } from "../services/authService";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await loginStudent({ email, password });

            if (result.data.role !== "admin") {
                setError("Access denied. Admin account required.");
                return;
            }

            localStorage.setItem("token", result.token);
            localStorage.setItem("student", JSON.stringify(result.data));

            navigate("/admin-dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message || "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="admin-auth-page">
                <div className="admin-auth-card">
                    <div className="admin-auth-content">
                        <span className="admin-auth-label">
                            COURSEBUDDY ADMINISTRATION
                        </span>

                        <h1>Administrator Login</h1>

                        <p>Sign in to access the administration panel.</p>

                        <form onSubmit={handleSubmit}>
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Administrator Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            {error && (
                                <p className="admin-auth-error">{error}</p>
                            )}

                            <button
                                type="submit"
                                className="admin-auth-button"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        <p className="admin-auth-footer">
                            New administrator?{" "}
                            <Link to="/admin-register">Register here</Link>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default AdminLogin;
