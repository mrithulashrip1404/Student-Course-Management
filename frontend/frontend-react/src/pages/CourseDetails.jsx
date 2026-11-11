
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function CourseDetails() {
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completing, setCompleting] = useState("");
    const [downloading, setDownloading] = useState(false);
    const [enrolling, setEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [enrollmentError, setEnrollmentError] = useState("");

    // Load course progress
    const loadProgress = async () => {
        try {
            const response = await api.get(`/progress/${id}`);

            setProgress(response.data.data);
            setIsEnrolled(true);
            setEnrollmentError("");
            setError("");
        } catch (err) {
            if (err.response?.status === 401) {
                setIsEnrolled(false);
                setProgress(null);
                setEnrollmentError(
                    "Log in as a student to enroll and access lessons."
                );
            } else if (err.response?.status === 403) {
                setIsEnrolled(false);
                setProgress(null);
                setEnrollmentError(
                    "Enroll in this course to access lessons and track your progress."
                );
            } else {
                setError(
                    err.response?.data?.message ||
                    "Unable to load learning progress."
                );
            }
        }
    };

    // Fetch course details
    useEffect(() => {
        async function fetchCourse() {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/courses/" + id);
                setCourse(response.data.data);
            } catch (err) {
                console.error("Failed to load course:", err);
                setError("Unable to load course details.");
            } finally {
                setLoading(false);
            }
        }

        fetchCourse();
    }, [id]);

    // Load progress after course details are available
    useEffect(() => {
        if (course) {
            loadProgress();
        }
    }, [course]);

    // Enroll in course
    const handleEnroll = async () => {
        try {
            setEnrolling(true);
            setError("");
            setMessage("");
            setEnrollmentError("");

            const response = await api.post(`/enrollments/${id}`);

            setIsEnrolled(true);
            setEnrollmentError("");
            setMessage(response.data.message);

            await loadProgress();
        } catch (err) {
            if (err.response?.status === 409) {
                setIsEnrolled(true);
                setEnrollmentError("");
                await loadProgress();
            } else if (err.response?.status === 401) {
                setEnrollmentError(
                    "Please log in as a student to enroll in this course."
                );
            } else if (err.response?.status === 403) {
                setEnrollmentError(
                    "Student access is required to enroll in this course."
                );
            } else {
                setError(
                    err.response?.data?.message ||
                    "Unable to enroll in this course."
                );
            }
        } finally {
            setEnrolling(false);
        }
    };

    // Mark lesson as completed
    const handleCompleteLesson = async (lessonId) => {
        try {
            setCompleting(lessonId);
            setMessage("");
            setError("");

            const response = await api.post(
                `/progress/${id}/lessons/${lessonId}/complete`
            );

            setMessage(response.data.message);
            await loadProgress();
        } catch (err) {
            if (err.response?.status === 401) {
                setEnrollmentError(
                    "Please log in as a student to update lesson progress."
                );
            } else {
                setError(
                    err.response?.data?.message ||
                    "Unable to update lesson progress."
                );
            }
        } finally {
            setCompleting("");
        }
    };

    // Download course completion certificate
    const handleCertificateDownload = async () => {
        try {
            setDownloading(true);
            setError("");

            const response = await api.get(
                `/certificates/${id}/download`,
                { responseType: "blob" }
            );

            const file = new Blob([response.data], {
                type: "application/pdf"
            });

            const url = window.URL.createObjectURL(file);
            const link = document.createElement("a");

            link.href = url;
            link.download = `${course.courseCode}-Certificate.pdf`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(
                "Unable to download certificate. Please try again."
            );
        } finally {
            setDownloading(false);
        }
    };

    // Course illustrations
    const icons = {
        "Python Programming": "🐍",
        "Web Development": "🌐"
    };

    // Course learning outcomes
    const outcomes = [
        "Understand the core concepts of " +
            (course?.courseName || "this course"),
        "Apply concepts through practical exercises",
        "Build confidence through hands-on learning"
    ];

    // Loading state
    if (loading) {
        return (
            <>
                <Navbar />
                <div className="cd-loading">
                    Loading course details...
                </div>
                <Footer />
            </>
        );
    }

    // Course loading error
    if (error && !course) {
        return (
            <>
                <Navbar />
                <div className="cd-error">
                    {error}
                    <p>
                        <Link to="/courses">
                            ← Back to Courses
                        </Link>
                    </p>
                </div>
                <Footer />
            </>
        );
    }

    // Course not found
    if (!course) {
        return (
            <>
                <Navbar />
                <div className="cd-error">
                    Course not found.
                    <p>
                        <Link to="/courses">
                            ← Back to Courses
                        </Link>
                    </p>
                </div>
                <Footer />
            </>
        );
    }

    const completedLessonIds = progress?.completedLessonIds || [];
    const lessons = course.lessons || [];

    return (
        <>
            <Navbar />

            <main className="cd-page">

                {/* Course navigation */}
                <div className="cd-topbar">
                    <Link to="/courses" className="cd-back">
                        ← All Courses
                    </Link>

                    <span className="cd-status">
                        ● {course.status || "Active"}
                    </span>
                </div>

                {/* Course overview */}
                <section className="cd-hero">

                    <div className="cd-hero-content">

                        <span className="cd-category">
                            {course.category}
                        </span>

                        <h1>{course.courseName}</h1>

                        <p className="cd-description">
                            {course.description ||
                                course.overview ||
                                "Explore this course and build your skills."}
                        </p>

                        {/* Course statistics */}
                        <div className="cd-stats">

                            <div className="cd-stat">
                                <span className="cd-stat-icon">
                                    📘
                                </span>

                                <div>
                                    <small>Course Code</small>
                                    <strong>{course.courseCode}</strong>
                                </div>
                            </div>

                            <div className="cd-stat">
                                <span className="cd-stat-icon">
                                    👨‍🏫
                                </span>

                                <div>
                                    <small>Instructor</small>
                                    <strong>{course.instructor}</strong>
                                </div>
                            </div>

                            <div className="cd-stat">
                                <span className="cd-stat-icon">
                                    ⏱️
                                </span>

                                <div>
                                    <small>Duration</small>
                                    <strong>{course.duration}</strong>
                                </div>
                            </div>

                        </div>

                        {/* Enrollment button */}
                        {isEnrolled ? (
                            <p className="cd-enrolled-message">
                                ✓ Already Enrolled
                            </p>
                        ) : (
                            <button
                                type="button"
                                className="cd-button"
                                onClick={handleEnroll}
                                disabled={enrolling}
                            >
                                {enrolling
                                    ? "Enrolling..."
                                    : "Enroll Now"}
                            </button>
                        )}

                        <Link to="/courses" className="cd-button">
                            ← Back to Courses
                        </Link>

                    </div>

                    {/* Course illustration */}
                    <div className="cd-illustration">
                        <div className="cd-icon-circle">
                            {icons[course.courseName] || "📚"}
                        </div>
                    </div>

                </section>

                {/* Course content */}
                <div className="cd-content-grid">

                    {/* Learning outcomes */}
                    <section className="cd-panel">

                        <div className="cd-section-heading">
                            <span className="cd-heading-icon">
                                🎯
                            </span>

                            <div>
                                <h2>What You'll Learn</h2>

                                <p>
                                    Skills you'll develop throughout this course.
                                </p>
                            </div>
                        </div>

                        <div className="cd-outcomes">
                            {outcomes.map((outcome, index) => (
                                <div
                                    className="cd-outcome"
                                    key={index}
                                >
                                    <span className="cd-check">
                                        ✓
                                    </span>

                                    <span>{outcome}</span>
                                </div>
                            ))}
                        </div>

                    </section>

                    {/* Course lessons */}
                    <section className="cd-panel">

                        <div className="cd-section-heading">
                            <span className="cd-heading-icon">
                                🗂️
                            </span>

                            <div>
                                <h2>Course Lessons</h2>

                                <p>
                                    Complete each lesson to track your progress.
                                </p>
                            </div>
                        </div>

                        {enrollmentError ? (
                            <p>{enrollmentError}</p>
                        ) : lessons.length === 0 ? (
                            <p>
                                No lessons have been added to this course yet.
                            </p>
                        ) : (
                            <div className="cd-modules">

                                {lessons.map((lesson, index) => {

                                    const completed =
                                        completedLessonIds.some(
                                            (lessonId) =>
                                                String(lessonId) ===
                                                String(lesson._id)
                                        );

                                    return (
                                        <div
                                            className="cd-module"
                                            key={lesson._id}
                                        >

                                            <span className="cd-module-number">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            <div>
                                                <strong className="cd-module-title">
                                                    {lesson.title}
                                                </strong>

                                                {lesson.description && (
                                                    <p>
                                                        {lesson.description}
                                                    </p>
                                                )}
                                            </div>

                                            {completed ? (
                                                <span>
                                                    ✓ Completed
                                                </span>
                                            ) : (
                                                <button
                                                    type="button"
                                                    disabled={!!completing}
                                                    onClick={() =>
                                                        handleCompleteLesson(
                                                            lesson._id
                                                        )
                                                    }
                                                >
                                                    {completing === lesson._id
                                                        ? "Saving..."
                                                        : "Complete"}
                                                </button>
                                            )}

                                        </div>
                                    );
                                })}

                            </div>
                        )}

                    </section>

                </div>

                {/* Learning progress */}
                {progress && isEnrolled && (
                    <section className="cd-panel">

                        <h2>Learning Progress</h2>

                        <h3>
                            {progress.progressPercentage}% Completed
                        </h3>

                        <progress
                            value={progress.progressPercentage}
                            max="100"
                            style={{ width: "100%" }}
                        />

                        <p>
                            {progress.completedLessons} of{" "}
                            {progress.totalLessons} lessons completed
                        </p>

                        {progress.status === "completed" && (
                            <div>
                                <h3>🎉 Course Completed!</h3>

                                <button
                                    type="button"
                                    onClick={handleCertificateDownload}
                                    disabled={downloading}
                                >
                                    {downloading
                                        ? "Preparing Certificate..."
                                        : "Download Certificate PDF"}
                                </button>
                            </div>
                        )}

                    </section>
                )}

                {/* Success message */}
                {message && (
                    <p style={{ color: "green" }}>
                        {message}
                    </p>
                )}

                {/* General error message */}
                {error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )}

                {/* Bottom banner */}
                <div className="cd-bottom-banner">

                    <div>
                        <h2>Ready to continue learning?</h2>

                        <p>
                            Explore more courses and keep building your skills.
                        </p>
                    </div>

                    <Link
                        to="/courses"
                        className="cd-bottom-button"
                    >
                        Browse Courses →
                    </Link>

                </div>

            </main>

            <Footer />
        </>
    );
}

export default CourseDetails;
