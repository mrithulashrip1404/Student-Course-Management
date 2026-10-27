import { Link } from "react-router-dom";

function CourseCard({ course }) {
    const courseIcons = {
        "Python Programming": "🐍",
        "Web Development": "🌐"
    };

    return (
        <div className="course-card">
            <div className="course-icon">
                <span className="course-emoji">
                    {courseIcons[course.courseName] || "📚"}
                </span>
            </div>

            <div className="course-info">
                <span className="course-category">
                    {course.category}
                </span>

                <h3>{course.courseName}</h3>

                <p>{course.description || course.overview}</p>

                <Link to={"/courses/" + course.id}>
                    View Course
                </Link>
            </div>
        </div>
    );
}

export default CourseCard;