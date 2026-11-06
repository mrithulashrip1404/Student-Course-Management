import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyCourses() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const fetchMyCourses = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/enrollments/my");
                const enrolledCourses = response.data.data || [];

                const coursesWithProgress = await Promise.all(
                    enrolledCourses.map(async (enrollment) => {
                        const course = enrollment.course;

                        if (!course) {
                            return null;
                        }

                        try {
                            const progressResponse = await api.get(
                                `/progress/${course._id}`
                            );

                            return {
                                ...enrollment,
                                progress: progressResponse.data.data
                            };
                        } catch (progressError) {
                            console.error(
                                "Unable to fetch course progress:",
                                progressError
                            );

                            return {
                                ...enrollment,
                                progress: {
                                    progressPercentage: 0,
                                    completedLessons: 0,
                                    totalLessons: course.lessons?.length || 0,
                                    status: enrollment.status
                                }
                            };
                        }
                    })
                );

                if (!cancelled) {
                    setEnrollments(
                        coursesWithProgress.filter(Boolean)
                    );
                }
            } catch (err) {
                console.error("Failed to fetch enrolled courses:", err);

                if (!cancelled) {
                    setError(
                        err.response?.data?.message ||
                        "Unable to load your enrolled courses. Please log in again and try."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchMyCourses();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <>
            <Navbar />

            <main className="my-courses-page">
                <h1>My Courses</h1>

                <p>View the courses you have enrolled in.</p>

                {loading ? (
                    <p>Loading your courses...</p>
                ) : error ? (
                    <div className="my-courses-error">
                        {error}
                    </div>
                ) : enrollments.length === 0 ? (
                    <div className="my-courses-empty">
                        <h2>No Enrolled Courses Yet</h2>

                        <p>
                            You have not enrolled in any courses.
                            Explore our available courses and start learning!
                        </p>

                        <Link to="/courses">
                            Browse Courses
                        </Link>
                    </div>
                ) : (
                    <section className="my-courses-list">
                        <h2>
                            Enrolled Courses ({enrollments.length})
                        </h2>

                        <div className="my-courses-grid">
                            {enrollments.map((enrollment) => {
                                const course = enrollment.course;
                                const progress = enrollment.progress;

                                const percentage =
                                    progress?.progressPercentage || 0;

                                const completed =
                                    enrollment.status === "completed" ||
                                    progress?.status === "completed";

                                return (
                                    <article
                                        className="my-course-card"
                                        key={enrollment._id}
                                    >
                                        <span className="my-course-category">
                                            {course.category || "General"}
                                        </span>

                                        <h3>{course.courseName}</h3>

                                        <p>
                                            {course.description ||
                                                "Continue learning and improve your skills."}
                                        </p>

                                        <p>
                                            <strong>Course Code:</strong>{" "}
                                            {course.courseCode}
                                        </p>

                                        <div className="my-course-status">
                                            <strong>Status:</strong>{" "}
                                            {completed
                                                ? "Completed"
                                                : "In Progress"}
                                        </div>

                                        <div className="my-course-progress">
                                            <div>
                                                <strong>Learning Progress</strong>

                                                <span>
                                                    {percentage}%
                                                </span>
                                            </div>

                                            <progress
                                                value={percentage}
                                                max="100"
                                            />

                                            <p>
                                                {progress?.completedLessons || 0} of{" "}
                                                {progress?.totalLessons || 0} lessons completed
                                            </p>
                                        </div>

                                        <Link
                                            to={`/courses/${course._id}`}
                                            className="my-course-button"
                                        >
                                            {completed
                                                ? "View Course"
                                                : "Continue Learning"}
                                        </Link>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </>
    );
}

export default MyCourses;