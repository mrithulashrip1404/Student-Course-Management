import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { getAdmins, createAdmin } from "../services/adminService";

function AdminDashboard() {
    const admin = JSON.parse(localStorage.getItem("student") || "{}");
    const adminName = admin.name || "Administrator";
    const adminInitial = adminName.charAt(0).toUpperCase();
    const [admins, setAdmins] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [lessons, setLessons] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [lessonTitle, setLessonTitle] = useState("");
    const [lessonDescription, setLessonDescription] = useState("");
    const [editingLesson, setEditingLesson] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const loadAdmins = async () => {
        try {
            const result = await getAdmins();
            setAdmins(result.data || []);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load administrators.");
        }
    };

    const loadCourses = async () => {
        try {
            const result = await api.get("/courses");
            const courseList = result.data.data || result.data || [];
            setCourses(courseList);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load courses.");
        }
    };

    const loadLessons = (courseId) => {
        const course = courses.find((item) => item._id === courseId);
        setLessons(course?.lessons || []);
    };

    useEffect(() => {
        loadAdmins();
        loadCourses();
    }, []);

    useEffect(() => {
        loadLessons(selectedCourse);
    }, [selectedCourse, courses]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            const result = await createAdmin({ name, email, password });
            setMessage(result.message || "Administrator created successfully.");
            setName("");
            setEmail("");
            setPassword("");
            await loadAdmins();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to create administrator.");
        } finally {
            setLoading(false);
        }
    };

    const handleLessonSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCourse) {
            setError("Please select a course.");
            return;
        }

        setMessage("");
        setError("");

        try {
            if (editingLesson) {
                await api.put(`/lessons/${selectedCourse}/${editingLesson._id}`, {
                    title: lessonTitle,
                    description: lessonDescription
                });
                setMessage("Lesson updated successfully.");
            } else {
                await api.post(`/lessons/${selectedCourse}`, {
                    title: lessonTitle,
                    description: lessonDescription
                });
                setMessage("Lesson added successfully.");
            }

            setLessonTitle("");
            setLessonDescription("");
            setEditingLesson(null);
            await loadCourses();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to save lesson.");
        }
    };

    const handleEdit = (lesson) => {
        setEditingLesson(lesson);
        setLessonTitle(lesson.title);
        setLessonDescription(lesson.description || "");
        setMessage("");
        setError("");
    };

    const handleDelete = async (lessonId) => {
        if (!window.confirm("Are you sure you want to delete this lesson?")) return;

        setMessage("");
        setError("");

        try {
            await api.delete(`/lessons/${selectedCourse}/${lessonId}`);
            setMessage("Lesson deleted successfully.");
            await loadCourses();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to delete lesson.");
        }
    };

    const cancelEdit = () => {
        setEditingLesson(null);
        setLessonTitle("");
        setLessonDescription("");
    };

    const totalLessons = courses.reduce(
        (total, course) => total + (course.lessons?.length || 0),
        0
    );

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    return (
        <>
            <Navbar />

            <div className="admin-layout">
                <aside className="admin-sidebar">
                    <div className="admin-sidebar-brand">
                        <div className="admin-brand-icon">C</div>
                        <div>
                            <h2>CourseBuddy</h2>
                            <span>ADMINISTRATION</span>
                        </div>
                    </div>

                    <p className="admin-nav-label">MAIN MENU</p>

                    <button
                        className="admin-nav-item active"
                        onClick={() => scrollToSection("admin-overview")}
                    >
                        <span>▦</span> Dashboard
                    </button>
		    <Link to="/manage-courses" className="admin-nav-item">
		        <span>📚</span> Manage Courses
		    </Link>

                    <button
                        className="admin-nav-item"
                        onClick={() => scrollToSection("admin-management")}
                    >
                        <span>♙</span> Administrators
                    </button>

                    <button
                        className="admin-nav-item"
                        onClick={() => scrollToSection("lesson-management")}
                    >
                        <span>▤</span> Course Lessons
                    </button>

                    <div className="admin-sidebar-bottom">
                        <div className="admin-profile-icon">{adminInitial}</div>
                        <div>
                            <strong>{adminName}</strong>
                            <span>Platform Manager</span>
                        </div>
                    </div>
                </aside>

                <main className="admin-main" id="admin-overview">
                    <header className="admin-topbar">
                        <div>
                            <span className="admin-breadcrumb">Workspace / Overview</span>
                            <h1>Admin Dashboard</h1>
                        </div>
                        <span className="admin-status">
                            <span></span> System Overview
                        </span>
                    </header>

                    <section className="admin-welcome">
                        <div>
                            <span className="admin-eyebrow">CONTROL CENTER</span>
                            <h2>Welcome to Administration</h2>
                            <p>Manage your platform, administrators and course content from one place.</p>
                        </div>
                        <div className="admin-welcome-symbol">✦</div>
                    </section>

                    {message && <div className="admin-alert success">{message}</div>}
                    {error && <div className="admin-alert error">{error}</div>}

                    <section className="admin-stats">
                        <article className="admin-stat-card">
                            <div className="admin-stat-icon purple">♙</div>
                            <span>Total Administrators</span>
                            <h2>{admins.length}</h2>
                            <small>Registered platform admins</small>
                        </article>

                        <article className="admin-stat-card">
                            <div className="admin-stat-icon blue">▤</div>
                            <span>Total Courses</span>
                            <h2>{courses.length}</h2>
                            <small>Available learning courses</small>
                        </article>

                        <article className="admin-stat-card">
                            <div className="admin-stat-icon pink">▣</div>
                            <span>Total Lessons</span>
                            <h2>{totalLessons}</h2>
                            <small>Lessons across all courses</small>
                        </article>
                    </section>

                    <section className="admin-section" id="admin-management">
                        <div className="admin-section-heading">
                            <div>
                                <span className="admin-eyebrow">USER ACCESS</span>
                                <h2>Administrator Management</h2>
                                <p>Create and manage platform administrators.</p>
                            </div>
                        </div>

                        <div className="admin-content-grid">
                            <div className="admin-panel">
                                <div className="admin-panel-heading">
                                    <div className="admin-panel-icon">＋</div>
                                    <div>
                                        <h3>Add Administrator</h3>
                                        <p>Create a new admin account</p>
                                    </div>
                                </div>

                                <form className="admin-form" onSubmit={handleSubmit}>
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter administrator name"
                                        required
                                    />

                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email address"
                                        required
                                    />

                                    <label>Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Minimum 6 characters"
                                        minLength={6}
                                        required
                                    />

                                    <button className="admin-primary-btn" type="submit" disabled={loading}>
                                        {loading ? "Creating..." : "＋ Create Administrator"}
                                    </button>
                                </form>
                            </div>

                            <div className="admin-panel">
                                <div className="admin-panel-heading">
                                    <div className="admin-panel-icon">♙</div>
                                    <div>
                                        <h3>Administrator List</h3>
                                        <p>{admins.length} registered administrators</p>
                                    </div>
                                </div>

                                {admins.length === 0 ? (
                                    <div className="admin-empty">No administrators found.</div>
                                ) : (
                                    <div className="admin-list">
                                        {admins.map((admin) => (
                                            <div className="admin-list-item" key={admin._id || admin.id}>
                                                <div className="admin-avatar">
                                                    {(admin.name || "A").charAt(0).toUpperCase()}
                                                </div>
                                                <div className="admin-list-details">
                                                    <strong>{admin.name}</strong>
                                                    <span>{admin.email}</span>
                                                </div>
                                                <span className="admin-role-badge">ADMIN</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="admin-section" id="lesson-management">
                        <div className="admin-section-heading">
                            <div>
                                <span className="admin-eyebrow">LEARNING CONTENT</span>
                                <h2>Course Lesson Management</h2>
                                <p>Add, edit and organize lessons within your courses.</p>
                            </div>
                        </div>

                        <div className="admin-panel">
                            <label className="admin-select-label">Select a Course</label>
                            <select
                                className="admin-course-select"
                                value={selectedCourse}
                                onChange={(e) => {
                                    setSelectedCourse(e.target.value);
                                    cancelEdit();
                                }}
                            >
                                <option value="">Choose a course to manage</option>
                                {courses.map((course) => (
                                    <option key={course._id} value={course._id}>
                                        {course.courseName}
                                    </option>
                                ))}
                            </select>

                            {!selectedCourse ? (
                                <div className="admin-empty large">
                                    <span>▤</span>
                                    <strong>Select a course to get started</strong>
                                    <p>Choose a course above to manage its lessons.</p>
                                </div>
                            ) : (
                                <div className="admin-lesson-grid">
                                    <div className="admin-lesson-form">
                                        <div className="admin-panel-heading">
                                            <div className="admin-panel-icon">＋</div>
                                            <div>
                                                <h3>{editingLesson ? "Edit Lesson" : "Add New Lesson"}</h3>
                                                <p>{editingLesson ? "Update lesson details" : "Create content for this course"}</p>
                                            </div>
                                        </div>

                                        <form className="admin-form" onSubmit={handleLessonSubmit}>
                                            <label>Lesson Title</label>
                                            <input
                                                type="text"
                                                value={lessonTitle}
                                                onChange={(e) => setLessonTitle(e.target.value)}
                                                placeholder="Enter lesson title"
                                                required
                                            />

                                            <label>Description</label>
                                            <textarea
                                                value={lessonDescription}
                                                onChange={(e) => setLessonDescription(e.target.value)}
                                                placeholder="Enter lesson description"
                                                rows={4}
                                            />

                                            <button className="admin-primary-btn" type="submit">
                                                {editingLesson ? "Update Lesson" : "＋ Add Lesson"}
                                            </button>

                                            {editingLesson && (
                                                <button className="admin-cancel-btn" type="button" onClick={cancelEdit}>
                                                    Cancel Editing
                                                </button>
                                            )}
                                        </form>
                                    </div>

                                    <div className="admin-lesson-list">
                                        <div className="admin-panel-heading">
                                            <div className="admin-panel-icon">▤</div>
                                            <div>
                                                <h3>Course Lessons</h3>
                                                <p>{lessons.length} lessons available</p>
                                            </div>
                                        </div>

                                        {lessons.length === 0 ? (
                                            <div className="admin-empty">No lessons added to this course yet.</div>
                                        ) : (
                                            <div className="admin-list">
                                                {lessons.map((lesson, index) => (
                                                    <div className="admin-lesson-item" key={lesson._id}>
                                                        <div className="admin-lesson-number">
                                                            {String(index + 1).padStart(2, "0")}
                                                        </div>
                                                        <div className="admin-lesson-details">
                                                            <strong>{lesson.title}</strong>
                                                            <span>{lesson.description || "No description available"}</span>
                                                            <div className="admin-lesson-actions">
                                                                <button type="button" onClick={() => handleEdit(lesson)}>
                                                                    Edit
                                                                </button>
                                                                <button type="button" onClick={() => handleDelete(lesson._id)}>
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    <footer className="admin-footer">
                        CourseBuddy Administration <span>•</span> Platform Management
                    </footer>
                </main>
            </div>

            <Footer />
        </>
    );
}

export default AdminDashboard;
