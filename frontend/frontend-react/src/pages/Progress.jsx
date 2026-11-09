
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Progress() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const fetchProgress = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/enrollments/my");
                const enrollments = response.data.data || [];

                const coursesWithProgress = await Promise.all(
                    enrollments.map(async (enrollment) => {
                        const course = enrollment.course;

                        if (!course) return null;

                        try {
                            const progressResponse = await api.get(
                                `/progress/${course._id}`
                            );

                            return {
                                ...enrollment,
                                progress: progressResponse.data.data
                            };
                        } catch (err) {
                            console.error(
                                "Unable to fetch progress:",
                                err
                            );

                            return {
                                ...enrollment,
                                progress: {
                                    completedLessons: 0,
                                    totalLessons: course.lessons?.length || 0,
                                    progressPercentage: 0,
                                    status: enrollment.status
                                }
                            };
                        }
                    })
                );

                if (!cancelled) {
                    setCourses(coursesWithProgress.filter(Boolean));
                }
            } catch (err) {
                console.error("Failed to load progress:", err);

                if (!cancelled) {
                    setError(
                        err.response?.data?.message ||
                        "Unable to load your learning progress. Please try again."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchProgress();

        return () => {
            cancelled = true;
        };
    }, []);

    const completedCourses = courses.filter(
        item =>
            item.enrollmentStatus === "completed" ||
            item.status === "completed" ||
            item.progress?.status === "completed"
    );

    const isCompleted = (item) =>
        item.status === "completed" ||
        item.progress?.status === "completed";

    const totalLessons = courses.reduce(
        (sum, item) => sum + (item.progress?.totalLessons || 0),
        0
    );

    const completedLessons = courses.reduce(
        (sum, item) => sum + (item.progress?.completedLessons || 0),
        0
    );

    const overallProgress = totalLessons
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    const completedCount = courses.filter(isCompleted).length;
    const inProgressCount = courses.length - completedCount;

    return (
        <>
            <Navbar />

            <main className="progress-page">
                <section className="progress-header">
                    <p className="section-label">YOUR LEARNING JOURNEY</p>
                    <h1>My Learning Progress</h1>
                    <p>
                        Track your completed lessons and see how far
                        you have progressed in your courses.
                    </p>
                </section>

                {loading ? (
                    <p>Loading your learning progress...</p>
                ) : error ? (
                    <div className="progress-error">
                        {error}
                    </div>
                ) : courses.length === 0 ? (
                    <section className="progress-empty">
                        <h2>No Learning Progress Yet</h2>
                        <p>
                            Enroll in a course to start tracking your
                            learning journey.
                        </p>
                        <Link to="/courses">Explore Courses</Link>
                    </section>
                ) : (
                    <>
                        <section className="progress-summary">
                            <article className="progress-summary-card">
                                <h3>Total Enrolled Courses</h3>
                                <strong>{courses.length}</strong>
                            </article>

                            <article className="progress-summary-card">
                                <h3>Completed Courses</h3>
                                <strong>{completedCount}</strong>
                            </article>

                            <article className="progress-summary-card">
                                <h3>In Progress</h3>
                                <strong>{inProgressCount}</strong>
                            </article>

                            <article className="progress-summary-card">
                                <h3>Lessons Completed</h3>
                                <strong>
                                    {completedLessons}/{totalLessons}
                                </strong>
                            </article>
                        </section>

                        <section className="overall-progress">
                            <div>
                                <h2>Overall Learning Progress</h2>
                                <strong>{overallProgress}%</strong>
                            </div>

                            <progress
                                value={overallProgress}
                                max="100"
                            />

                            <p>
                                You have completed {completedLessons} out
                                of {totalLessons} lessons across your courses.
                            </p>
                        </section>

                        <section className="course-progress-section">
                            <h2>Course-wise Progress</h2>

                            <div className="course-progress-list">
                                {courses.map((item) => {
                                    const course = item.course;
                                    const progress = item.progress;
                                    const percentage =
                                        progress?.progressPercentage || 0;

                                    const completed = isCompleted(item);

                                    return (
                                        <article
                                            className="course-progress-card"
                                            key={item._id}
                                        >
                                            <div className="course-progress-info">
                                                <span>
                                                    {course.category || "General"}
                                                </span>

                                                <h3>{course.courseName}</h3>

                                                <p>
                                                    Course Code: {course.courseCode}
                                                </p>

                                                <p>
                                                    {progress?.completedLessons || 0}
                                                    {" of "}
                                                    {progress?.totalLessons || 0}
                                                    {" lessons completed"}
                                                </p>
                                            </div>

                                            <div className="course-progress-details">
                                                <div>
                                                    <strong>
                                                        {completed
                                                            ? "Completed"
                                                            : percentage === 0
                                                            ? "Not Started"
                                                            : "In Progress"}
                                                    </strong>

                                                    <strong>{percentage}%</strong>
                                                </div>

                                                <progress
                                                    value={percentage}
                                                    max="100"
                                                />

                                                <Link
                                                    to={`/courses/${course._id}`}
                                                >
                                                    {completed
                                                        ? "View Course"
                                                        : "Continue Learning"}
                                                </Link>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    </>
                )}
            </main>

            <Footer />
        </>
    );
}

export default Progress;
