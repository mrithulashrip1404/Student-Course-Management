import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import HeroBanner from "../components/HeroBanner";
import CourseCard from "../components/CourseCard";
import WeeklySchedule from "../components/WeeklySchedule";
import QuickActions from "../components/QuickActions";
import ProgressCard from "../components/ProgressCard";

function StudentDashboard() {
    const courses = [
        {
            id: 1,
            name: "Full Stack Development",
            category: "WEB DEVELOPMENT",
            description: "Learn frontend and backend development.",
            icon: "💻",
            progress: 78
        },
        {
            id: 2,
            name: "Artificial Intelligence",
            category: "AI & MACHINE LEARNING",
            description: "Learn the fundamentals of AI and machine learning.",
            icon: "🤖",
            progress: 64
        },
        {
            id: 3,
            name: "Database Management",
            category: "DATABASE",
            description: "Learn database concepts and management.",
            icon: "🗄️",
            progress: 52
        }
    ];

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main">
                <TopBar />

                <div className="dashboard-content">
                    <HeroBanner />

                    <section className="courses-section">
                        <div className="section-heading">
                            <div>
                                <p className="section-label">MY COURSES</p>
                                <h2>Continue Learning</h2>
                            </div>
                        </div>

                        <div className="course-grid">
                            {courses.map(course => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                />
                            ))}
                        </div>
                    </section>

                    <div className="dashboard-grid">
                        <WeeklySchedule />
                        <ProgressCard />
                    </div>

                    <QuickActions />
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;