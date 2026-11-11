
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import { useCourses } from "../context/CourseContext";
import { useSearchParams } from "react-router-dom";

function Courses() {
    const { courses, loading, error } = useCourses();
    const [searchParams] = useSearchParams();

    const searchTerm = (searchParams.get("search") || "").toLowerCase();

    const filteredCourses = courses.filter((course) => {
        const searchableText = [
            course.title,
            course.name,
            course.description,
            course.category,
            course.instructor
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchableText.includes(searchTerm);
    });

    return (
        <>
            <Navbar />

            <main className="courses-page">
                <h1>Explore Courses</h1>

                {searchTerm && (
                    <p>
                        Search results for: <strong>{searchParams.get("search")}</strong>
                    </p>
                )}

                {loading && <p>Loading courses...</p>}

                {error && <p>{error}</p>}

                {!loading && !error && (
                    filteredCourses.length > 0 ? (
                        <div className="course-grid">
                            {filteredCourses.map((course) => (
                                <CourseCard
                                    key={course._id || course.id}
                                    course={course}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No courses found matching your search.</p>
                    )
                )}
            </main>

            <Footer />
        </>
    );
}

export default Courses;
