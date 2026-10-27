import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import { useCourses } from "../context/CourseContext";

function Courses() {
    const {
        courses,
        loading,
        error
    } = useCourses();

    return (
        <>
            <Navbar />

            <main>
                <h1>My Learning</h1>

                {loading && (
                    <p>Loading courses...</p>
                )}

                {error && (
                    <p>{error}</p>
                )}

                {!loading &&
                    !error && (
                        <div className="course-grid">
                            {courses.map(course => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                />
                            ))}
                        </div>
                    )}
            </main>

            <Footer />
        </>
    );
}

export default Courses;