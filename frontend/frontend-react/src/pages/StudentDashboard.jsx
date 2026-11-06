import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import HeroBanner from "../components/HeroBanner";
import CourseCard from "../components/CourseCard";
import WeeklySchedule from "../components/WeeklySchedule";
import QuickActions from "../components/QuickActions";
import ProgressCard from "../components/ProgressCard";
import Chat from "../components/Chat";
import Notifications from "../components/Notifications";

import api from "../services/api";

function StudentDashboard() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const fetchDashboardCourses = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/enrollments/my");
                const enrolledCourses = response.data.data || [];

                const coursesWithProgress = await Promise.all(
                    enrolledCourses.map(async (enrollment) => {
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
                                    totalLessons: course.lessons?.length || 0
                                }
                            };
                        }
                    })
                );

                if (!cancelled) {
                    setEnrollments(coursesWithProgress.filter(Boolean));
                }
            } catch (err) {
                console.error("Failed to load dashboard courses:", err);

                if (!cancelled) {
                    setError(
                        err.response?.data?.message ||
                        "Unable to load your enrolled courses."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchDashboardCourses();

        return () => {
            cancelled = true;
        };
    }, []);

    const notStartedCourses = enrollments.filter(
        item =>
            item.status === "active" &&
            (item.progress?.progressPercentage || 0) === 0
    );

    const inProgressCourses = enrollments.filter(
        item =>
            item.status === "active" &&
            (item.progress?.progressPercentage || 0) > 0 &&
            (item.progress?.progressPercentage || 0) < 100
    );

    const completedCourses = enrollments.filter(
        item =>
            item.status === "completed" ||
            (item.progress?.progressPercentage || 0) === 100
    );

    const renderCourseSection = (title, items, actionLabel) => (
        <section className="courses-section">
            <div className="section-heading">
                <div>
                    <p className="section-label">MY COURSES</p>
                    <h2>{title} ({items.length})</h2>
                </div>
            </div>

            {items.length === 0 ? (
                <p className="empty-course-message">
                    No courses in this section.
                </p>
            ) : (
                <div className="course-grid">
                    {items.map(item => (
                        <CourseCard
                            key={item._id}
                            course={item.course}
                            actionLabel={actionLabel}
                        >
                            <div className="dashboard-course-progress">
                                <div className="dashboard-progress-heading">
                                    <strong>Learning Progress</strong>
                                    <span>
                                        {item.progress?.progressPercentage || 0}%
                                    </span>
                                </div>

                                <div className="dashboard-progress-track">
                                    <div
                                        className="dashboard-progress-fill"
                                        style={{
                                            width: `${
                                                item.progress?.progressPercentage || 0
                                            }%`
                                        }}
                                    />
                                </div>

                                <p>
                                    {item.progress?.completedLessons || 0} of{" "}
                                    {item.progress?.totalLessons || 0} lessons completed
                                </p>

                                <span className="dashboard-course-status">
                                    Status: {title}
                                </span>
                            </div>
                        </CourseCard>
                    ))}
                </div>
            )}
        </section>
    );

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main">
                <TopBar />

                <div className="dashboard-content">
                    <HeroBanner />

                    {loading ? (
                        <p>Loading your enrolled courses...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <>
                            {renderCourseSection(
                                "Enrolled - Not Started",
                                notStartedCourses,
                                "Start Learning"
                            )}

                            {renderCourseSection(
                                "In Progress",
                                inProgressCourses,
                                "Continue Learning"
                            )}

                            {renderCourseSection(
                                "Completed",
                                completedCourses,
                                "View Course"
                            )}
                        </>
                    )}

                    <div className="dashboard-grid">
                        <WeeklySchedule />
                        <ProgressCard />
                    </div>

                    <QuickActions />

                    <div className="dashboard-grid">
                        <Chat />
                        <Notifications />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;