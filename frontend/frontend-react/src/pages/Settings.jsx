import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import api from "../services/api";

function Settings() {
    const [preferences, setPreferences] = useState({
        compactView: false,
        showDashboardNotifications: true
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get("/v1/profile/settings");

                setPreferences({
                    compactView: response.data.data.compactView ?? false,
                    showDashboardNotifications:
                        response.data.data.showDashboardNotifications ?? true
                });
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load your settings."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleToggle = async (setting) => {
        const updatedValue = !preferences[setting];

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const response = await api.put("/v1/profile/settings", {
                [setting]: updatedValue
            });

            setPreferences({
                compactView: response.data.data.compactView,
                showDashboardNotifications:
                    response.data.data.showDashboardNotifications
            });

            setSuccess("Settings saved successfully.");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to save your settings."
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

                <section className="settings-page">
                    <div className="page-heading">
                        <p>ACCOUNT</p>
                        <h2>Settings</h2>
                        <span>Manage your learning preferences.</span>
                    </div>

                    {loading ? (
                        <p>Loading settings...</p>
                    ) : (
                        <>
                            <div className="settings-card">
                                <h3>Dashboard Preferences</h3>

                                <div className="setting-item">
                                    <div>
                                        <strong>
                                            Show Dashboard Notifications
                                        </strong>
                                        <p>
                                            Display your latest notifications
                                            on the student dashboard.
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={
                                            preferences.showDashboardNotifications
                                        }
                                        disabled={saving}
                                        onChange={() =>
                                            handleToggle(
                                                "showDashboardNotifications"
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="settings-card">
                                <h3>Display Preferences</h3>

                                <div className="setting-item">
                                    <div>
                                        <strong>Compact View</strong>
                                        <p>
                                            Use a more compact layout for your
                                            dashboard.
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={preferences.compactView}
                                        disabled={saving}
                                        onChange={() =>
                                            handleToggle("compactView")
                                        }
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {saving && <p>Saving changes...</p>}

                    {error && (
                        <p className="settings-error">{error}</p>
                    )}

                    {success && (
                        <p className="settings-success">{success}</p>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Settings;