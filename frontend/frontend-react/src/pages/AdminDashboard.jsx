
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { getAdmins, createAdmin } from "../services/adminService";

function AdminDashboard() {
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
            setError(
                err.response?.data?.message || "Unable to load administrators."
            );
        }
    };

    const loadCourses = async () => {
        try {
            const result = await api.get("/courses");
            const courseList = result.data.data || result.data || [];

            setCourses(courseList);
        } catch (err) {
            setError(
                err.response?.data?.message || "Unable to load courses."
            );
        }
    };

    const loadLessons = (courseId) => {
        const course = courses.find(
            (item) => item._id === courseId
        );

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

            setMessage(
                result.message || "Administrator created successfully."
            );

            setName("");
            setEmail("");
            setPassword("");

            await loadAdmins();
        } catch (err) {
            setError(
                err.response?.data?.message || "Unable to create administrator."
            );
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
                await api.put(
                    `/lessons/${selectedCourse}/${editingLesson._id}`,
                    {
                        title: lessonTitle,
                        description: lessonDescription
                    }
                );

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
            setError(
                err.response?.data?.message || "Unable to save lesson."
            );
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
        if (!window.confirm("Are you sure you want to delete this lesson?")) {
            return;
        }

        setMessage("");
        setError("");

        try {
            await api.delete(
                `/lessons/${selectedCourse}/${lessonId}`
            );

            setMessage("Lesson deleted successfully.");
            await loadCourses();
        } catch (err) {
            setError(
                err.response?.data?.message || "Unable to delete lesson."
            );
        }
    };

    const cancelEdit = () => {
        setEditingLesson(null);
        setLessonTitle("");
        setLessonDescription("");
    };

    return (
        <>
            <Navbar />

            <main>
                <h1>Admin Dashboard</h1>
                <p>Manage students, courses, lessons, and administrators.</p>

                <section>
                    <h2>Add New Administrator</h2>

                    <form onSubmit={handleSubmit}>
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Administrator name"
                            required
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Administrator email"
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

                        <button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Administrator"}
                        </button>
                    </form>
                </section>

                <section>
                    <h2>Administrator List</h2>

                    {admins.length === 0 ? (
                        <p>No administrators found.</p>
                    ) : (
                        <ul>
                            {admins.map((admin) => (
                                <li key={admin._id || admin.id}>
                                    {admin.name} — {admin.email}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section>
                    <h2>Manage Course Lessons</h2>

                    <label>Select Course</label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => {
                            setSelectedCourse(e.target.value);
                            cancelEdit();
                        }}
                    >
                        <option value="">Select a course</option>

                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.courseName}
                            </option>
                        ))}
                    </select>

                    {selectedCourse && (
                        <>
                            <h3>
                                {editingLesson ? "Edit Lesson" : "Add New Lesson"}
                            </h3>

                            <form onSubmit={handleLessonSubmit}>
                                <label>Lesson Title</label>
                                <input
                                    type="text"
                                    value={lessonTitle}
                                    onChange={(e) =>
                                        setLessonTitle(e.target.value)
                                    }
                                    placeholder="Enter lesson title"
                                    required
                                />

                                <label>Description</label>
                                <textarea
                                    value={lessonDescription}
                                    onChange={(e) =>
                                        setLessonDescription(e.target.value)
                                    }
                                    placeholder="Enter lesson description"
                                />

                                <button type="submit">
                                    {editingLesson ? "Update Lesson" : "Add Lesson"}
                                </button>

                                {editingLesson && (
                                    <button type="button" onClick={cancelEdit}>
                                        Cancel
                                    </button>
                                )}
                            </form>

                            <h3>Course Lessons</h3>

                            {lessons.length === 0 ? (
                                <p>No lessons added to this course yet.</p>
                            ) : (
                                <ol>
                                    {lessons.map((lesson) => (
                                        <li key={lesson._id}>
                                            <strong>{lesson.title}</strong>
                                            <p>{lesson.description}</p>

                                            <button
                                                type="button"
                                                onClick={() => handleEdit(lesson)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(lesson._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </>
                    )}
                </section>

                {message && (
                    <p style={{ color: "green" }}>{message}</p>
                )}

                {error && (
                    <p style={{ color: "red" }}>{error}</p>
                )}
            </main>

            <Footer />
        </>
    );
}

export default AdminDashboard;