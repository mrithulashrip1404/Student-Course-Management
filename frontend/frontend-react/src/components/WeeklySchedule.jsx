import { Link } from "react-router-dom";

function WeeklySchedule({ enrollments = [] }) {
    const activeCourses = enrollments.filter(
        (item) =>
            item.status === "active" &&
            (item.progress?.progressPercentage || 0) < 100
    );

    const nextCourse = activeCourses[0];

    const totalLessons = enrollments.reduce(
        (sum, item) => sum + (item.progress?.totalLessons || 0),
        0
    );

    const completedLessons = enrollments.reduce(
        (sum, item) => sum + (item.progress?.completedLessons || 0),
        0
    );

    const remainingLessons = Math.max(
        totalLessons - completedLessons,
        0
    );

    return (
        <section className="weekly-schedule learning-focus">
            <div className="section-heading">
                <div>
                    <p className="section-label">LEARNING OVERVIEW</p>
                    <h2>Your Learning Focus</h2>
                </div>
                <Link to="/progress">View Progress</Link>
            </div>

            <div className="learning-focus-stats">
                <div>
                    <span>📚</span>
                    <strong>{activeCourses.length}</strong>
                    <p>Active Courses</p>
                </div>

                <div>
                    <span>✅</span>
                    <strong>{completedLessons}</strong>
                    <p>Lessons Completed</p>
                </div>

                <div>
                    <span>🎯</span>
                    <strong>{remainingLessons}</strong>
                    <p>Lessons Remaining</p>
                </div>
            </div>

            <div className="learning-focus-next">
                <h3>Continue Your Learning</h3>

                {nextCourse?.course ? (
                    <>
                        <p>{nextCourse.course.title}</p>

                        <div className="learning-focus-progress">
                            <div
                                style={{
                                    width: `${
                                        nextCourse.progress?.progressPercentage || 0
                                    }%`
                                }}
                            />
                        </div>

                        <small>
                            {nextCourse.progress?.progressPercentage || 0}%
                            completed
                        </small>

                        <Link
                            to={`/courses/${nextCourse.course._id}`}
                            className="learning-focus-button"
                        >
                            Continue Course
                        </Link>
                    </>
                ) : (
                    <p>
                        {enrollments.length > 0
                            ? "Congratulations! You have completed your active courses."
                            : "Enroll in a course to begin your learning journey."}
                    </p>
                )}
            </div>
        </section>
    );
}

export default WeeklySchedule;