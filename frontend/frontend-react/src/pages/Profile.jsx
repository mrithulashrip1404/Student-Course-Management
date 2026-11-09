import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import api from "../services/api";

function Profile() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        role: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/v1/profile");

                setProfile({
                    name: response.data.data.name || "",
                    email: response.data.data.email || "",
                    role: response.data.data.role || ""
                });
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load your profile."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

        setSuccess("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!profile.name.trim()) {
            setError("Name cannot be empty.");
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const response = await api.put("/v1/profile", {
                name: profile.name.trim()
            });

            const updatedProfile = response.data.data;

            setProfile((previous) => ({
                ...previous,
                name: updatedProfile.name
            }));

            const student = JSON.parse(
                localStorage.getItem("student") || "{}"
            );

            student.name = updatedProfile.name;

            localStorage.setItem("student", JSON.stringify(student));

            setSuccess("Profile updated successfully.");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to update your profile."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="dashboard-main">
                <TopBar />

                <section className="profile-page">
                    <div className="page-heading">
                        <p>ACCOUNT</p>
                        <h2>My Profile</h2>
                        <span>View and manage your personal information.</span>
                    </div>

                    {loading ? (
                        <p>Loading profile...</p>
                    ) : (
                        <div className="profile-card">
                            <div className="profile-card-header">
                                <div className="profile-avatar">
                                    {profile.name.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <h3>{profile.name || "Student"}</h3>
                                    <p>{profile.role || "Student"}</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="profile-form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                <div className="profile-form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={profile.email}
                                        readOnly
                                    />
                                </div>

                                <div className="profile-form-group">
                                    <label htmlFor="role">Account Role</label>
                                    <input
                                        id="role"
                                        type="text"
                                        value={profile.role}
                                        readOnly
                                    />
                                </div>

                                {error && (
                                    <p className="profile-error">{error}</p>
                                )}

                                {success && (
                                    <p className="profile-success">{success}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="profile-save-button"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </form>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Profile;