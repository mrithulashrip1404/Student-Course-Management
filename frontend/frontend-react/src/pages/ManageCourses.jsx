
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCourses } from "../context/CourseContext";

const emptyCourse = {
    courseName: "",
    courseCode: "",
    instructor: "",
    duration: "",
    category: ""
};

function ManageCourses() {
    const {
        courses,
        loading,
        error,
        addCourse,
        updateCourse,
        deleteCourse
    } = useCourses();

    const [form, setForm] = useState(emptyCourse);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");
    const [formError, setFormError] = useState("");

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setFormError("");

        try {
            if (editingId !== null) {
                await updateCourse(editingId, form);
                setMessage("Course updated successfully.");
            } else {
                await addCourse(form);
                setMessage("Course added successfully.");
            }

            setForm(emptyCourse);
            setEditingId(null);
        } catch (err) {
            setFormError(
                err.response?.data?.message ||
                "Unable to save course. Please log in and try again."
            );
        }
    }

    function handleEdit(course) {
        setForm({
            courseName: course.courseName || course.name || "",
            courseCode: course.courseCode || "",
            instructor: course.instructor || "",
            duration: course.duration || "",
            category: course.category || ""
        });

        setEditingId(course.id);
        setMessage("");
        setFormError("");
    }

    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this course?")) {
            return;
        }

        setMessage("");
        setFormError("");

        try {
            await deleteCourse(id);
            setMessage("Course deleted successfully.");
	    setTimeout(() => setMessage(""), 3000);

            if (editingId === id) {
                setForm(emptyCourse);
                setEditingId(null);
            }
        } catch (err) {
            setFormError(
                err.response?.data?.message ||
                "Unable to delete course. Please log in and try again."
            );
        }
    }

    function handleCancel() {
        setForm(emptyCourse);
        setEditingId(null);
        setMessage("");
        setFormError("");
    }

    return (
        <>
            <Navbar />

            <main className="manage-courses-page">
                <h1>Manage Courses</h1>
                <p>Add, update and manage courses here.</p>

                <section>
                    <h2>{editingId !== null ? "Edit Course" : "Add Course"}</h2>

                    <form onSubmit={handleSubmit}>
                        <label>Course Name</label>
                        <input
                            name="courseName"
                            value={form.courseName}
                            onChange={handleChange}
                            required
                        />

                        <label>Course Code</label>
                        <input
                            name="courseCode"
                            value={form.courseCode}
                            onChange={handleChange}
                            required
                        />

                        <label>Instructor</label>
                        <input
                            name="instructor"
                            value={form.instructor}
                            onChange={handleChange}
                            required
                        />

                        <label>Duration</label>
                        <input
                            name="duration"
                            value={form.duration}
                            onChange={handleChange}
                            placeholder="e.g. 8 Weeks"
                            required
                        />

                        <label>Category</label>
                        <input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">
                            {editingId !== null ? "Update Course" : "Add Course"}
                        </button>

                        {editingId !== null && (
                            <button type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                        )}
                    </form>

                    {message && <p>{message}</p>}
                    {formError && <p role="alert">{formError}</p>}
                </section>

                <section>
                    <h2>Existing Courses</h2>

                    {loading && <p>Loading courses...</p>}
                    {error && <p role="alert">{error}</p>}

                    {!loading && !error && courses.length === 0 && (
                        <p>No courses available.</p>
                    )}

                    {!loading && !error && courses.map((course) => (
                        <article key={course.id}>
                            <h3>{course.courseName || course.name}</h3>
                            <p>Code: {course.courseCode || "N/A"}</p>
                            <p>Instructor: {course.instructor || "N/A"}</p>
                            <p>Duration: {course.duration || "N/A"}</p>
                            <p>Category: {course.category || "N/A"}</p>

                            <button
                                type="button"
                                onClick={() => handleEdit(course)}
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={() => handleDelete(course.id)}
                            >
                                Delete
                            </button>
                        </article>
                    ))}
                </section>
            </main>

            <Footer />
        </>
    );
}

export default ManageCourses;
