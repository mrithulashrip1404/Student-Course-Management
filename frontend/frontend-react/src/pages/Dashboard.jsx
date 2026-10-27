import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
    return (
        <>
            <Navbar />

            <div className="dashboard-layout">
                <aside className="sidebar">

                    <div className="sidebar-logo">
                        <h2>CourseBuddy</h2>
                        <p>Student Course Management</p>
                    </div>

                    <nav className="sidebar-nav">
                        <a href="/dashboard">Dashboard</a>
                        <a href="/courses">My Courses</a>
                        <a href="/progress">Progress</a>
                        <a href="/notifications">Notifications</a>
                    </nav>

                    <div className="sidebar-bottom">
                        <a href="/profile">Profile</a>
                        <a href="/">Logout</a>
                    </div>

                </aside>

                <section className="dashboard-main">

                    <div className="topbar">
                        <div className="topbar-welcome">
                            <p>Welcome back!</p>
                            <h1>Student Dashboard</h1>
                        </div>
                    </div>

                    <div className="dashboard-content">

                        <h2>Overview</h2>

                        <div className="dashboard-grid">

                            <div className="dashboard-card">
                                <h3>My Courses</h3>
                                <p>3</p>
                                <span>Courses enrolled</span>
                            </div>

                            <div className="dashboard-card">
                                <h3>Completed</h3>
                                <p>1</p>
                                <span>Courses completed</span>
                            </div>

                            <div className="dashboard-card">
                                <h3>In Progress</h3>
                                <p>2</p>
                                <span>Courses in progress</span>
                            </div>

                        </div>

                    </div>

                </section>
            </div>

            <Footer />
        </>
    );
}

export default Dashboard;