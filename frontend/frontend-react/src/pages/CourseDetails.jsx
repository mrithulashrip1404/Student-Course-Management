import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function CourseDetails() {
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    const icons = {
        "Python Programming": "🐍",
        "Web Development": "🌐"
    };

    const outcomes = [
        "Understand the core concepts of " +
            (course?.courseName || "this course"),
        "Apply concepts through practical exercises",
        "Build confidence through hands-on learning"
    ];

    const modules = [
        "Introduction and Fundamentals",
        "Core Concepts and Techniques",
        "Practical Applications"
    ];

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="cd-loading">Loading course details...</div>
                <Footer />
            </>
        );
    }

    if (error || !course) {
        return (
            <>
                <Navbar />
                <div className="cd-error">
                    {error || "Course not found."}
                    <p>
                        <Link to="/courses">← Back to Courses</Link>
                    </p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="cd-page">
                <div className="cd-topbar">
                    <Link to="/courses" className="cd-back">
                        ← All Courses
                    </Link>

                    <span className="cd-status">
                        ● {course.status || "Active"}
                    </span>
                </div>

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

                        <div className="cd-stats">
                            <div className="cd-stat">
                                <span className="cd-stat-icon">📘</span>
                                <div>
                                    <small>Course Code</small>
                                    <strong>{course.courseCode}</strong>
                                </div>
                            </div>

                            <div className="cd-stat">
                                <span className="cd-stat-icon">👨‍🏫</span>
                                <div>
                                    <small>Instructor</small>
                                    <strong>{course.instructor}</strong>
                                </div>
                            </div>

                            <div className="cd-stat">
                                <span className="cd-stat-icon">⏱️</span>
                                <div>
                                    <small>Duration</small>
                                    <strong>{course.duration}</strong>
                                </div>
                            </div>
                        </div>

                        <Link to="/courses" className="cd-button">
                            ← Back to Courses
                        </Link>
                    </div>

                    <div className="cd-illustration">
                        <div className="cd-icon-circle">
                            {icons[course.courseName] || "📚"}
                        </div>
                    </div>
                </section>

                <div className="cd-content-grid">
                    <section className="cd-panel">
                        <div className="cd-section-heading">
                            <span className="cd-heading-icon">🎯</span>

                            <div>
                                <h2>What You'll Learn</h2>
                                <p>
                                    Skills you'll develop throughout this course.
                                </p>
                            </div>
                        </div>

                        <div className="cd-outcomes">
                            {outcomes.map((outcome, index) => (
                                <div className="cd-outcome" key={index}>
                                    <span className="cd-check">✓</span>
                                    <span>{outcome}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="cd-panel">
                        <div className="cd-section-heading">
                            <span className="cd-heading-icon">🗂️</span>

                            <div>
                                <h2>Course Modules</h2>
                                <p>
                                    Your learning journey, step by step.
                                </p>
                            </div>
                        </div>

                        <div className="cd-modules">
                            {modules.map((module, index) => (
                                <div className="cd-module" key={index}>
                                    <span className="cd-module-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="cd-module-title">
                                        {module}
                                    </span>

                                    <span className="cd-module-arrow">
                                        ›
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="cd-bottom-banner">
                    <div>
                        <h2>Ready to continue learning?</h2>
                        <p>
                            Explore more courses and keep building your skills.
                        </p>
                    </div>

                    <Link to="/courses" className="cd-bottom-button">
                        Browse Courses →
                    </Link>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default CourseDetails;