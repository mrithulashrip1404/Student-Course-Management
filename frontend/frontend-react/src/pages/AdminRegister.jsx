
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerAdmin } from "../services/authService";

function AdminRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registrationCode, setRegistrationCode] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            const result = await registerAdmin({
                name,
                email,
                password,
                registrationCode
            });

            setSuccess(result.message || "Admin registration successful.");

            setTimeout(() => {
                navigate("/admin-login");
            }, 1500);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
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

                        <h1>Administrator Registration</h1>

                        <p>Create your administrator account.</p>

                        <form onSubmit={handleSubmit}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                minLength={2}
                                required
                            />

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
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                                required
                            />

                            <label>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />

                            <label>Private Registration Code</label>
                            <input
                                type="password"
                                placeholder="Enter admin registration code"
                                value={registrationCode}
                                onChange={(e) => setRegistrationCode(e.target.value)}
                                required
                            />

                            {error && (
                                <p className="admin-auth-error">{error}</p>
                            )}

                            {success && (
                                <p className="admin-auth-success">{success}</p>
                            )}

                            <button
                                type="submit"
                                className="admin-auth-button"
                                disabled={loading}
                            >
                                {loading ? "Registering..." : "Register as Admin"}
                            </button>
                        </form>

                        <p className="admin-auth-footer">
                            Already have an admin account?{" "}
                            <Link to="/admin-login">Login here</Link>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default AdminRegister;
