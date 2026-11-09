
import { Link } from "react-router-dom";

function ProgressCard({ enrollments = [] }) {
    const totalLessons = enrollments.reduce(
        (sum, item) => sum + (item.progress?.totalLessons || 0),
        0
    );

    const completedLessons = enrollments.reduce(
        (sum, item) => sum + (item.progress?.completedLessons || 0),
        0
    );

    const percentage = totalLessons
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    return (
        <section className="progress-card">
            <div className="section-heading">
                <div>
                    <p className="section-label">YOUR PROGRESS</p>
                    <h2>Keep up the great work!</h2>
                </div>
            </div>

            <div className="progress-content">
                <div className="progress-circle">
                    <strong>{percentage}%</strong>
                    <span>Completed</span>
                </div>

                <div className="progress-info">
                    <h3>
                        {totalLessons > 0
                            ? "You're making progress!"
                            : "Your learning journey starts here!"}
                    </h3>

                    <p>
                        {completedLessons} of {totalLessons} lessons completed.
                    </p>

                    <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <div
                            className="progress-fill"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>

                    <Link to="/progress">View Detailed Progress</Link>
                </div>
            </div>
        </section>
    );
}

export default ProgressCard;
