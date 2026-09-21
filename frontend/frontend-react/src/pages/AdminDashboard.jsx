import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {
    return (
        <>
            <Navbar />

            <main>
                <h1>Admin Dashboard</h1>
                <p>Manage students and courses from the admin dashboard.</p>
            </main>

            <Footer />
        </>
    );
}

export default AdminDashboard;