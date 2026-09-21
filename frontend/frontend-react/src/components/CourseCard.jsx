import { Link } from "react-router-dom";

function CourseCard({ course }) {
    return (
        <div className="course-card">
            <h3>{course.name}</h3>
            <p>{course.description}</p>

            <Link to={`/courses/${course.id}`}>
                View Course
            </Link>
        </div>
    );
}

export default CourseCard;