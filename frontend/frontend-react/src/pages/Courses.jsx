import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";

function Courses() {
    const courses = [
        {
            id: 1,
            name: "Full Stack Development",
            description: "Learn frontend and backend development."
        },
        {
            id: 2,
            name: "Artificial Intelligence",
            description: "Learn the fundamentals of AI and machine learning."
        },
        {
            id: 3,
            name: "Database Management",
            description: "Learn database concepts and management."
        }
    ];

    return (
        <>
            <Navbar />

            <main>
                <h1>Courses</h1>

                {courses.map(course => (
                    <CourseCard
                        key={course.id}
                        course={course}
                    />
                ))}
            </main>

            <Footer />
        </>
    );
}

export default Courses;