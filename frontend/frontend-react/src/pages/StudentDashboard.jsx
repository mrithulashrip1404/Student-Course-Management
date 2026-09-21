import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function StudentDashboard() {
    return (
        <>
            <Navbar />

            <main>
                <h1>Student Dashboard</h1>
                <p>View your courses, progress and notifications.</p>
            </main>

            <Footer />
        </>
    );
}

export default StudentDashboard;