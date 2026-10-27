import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">
            <header className="home-header">
                <div className="home-logo">
                    <div className="logo-icon">✦</div>

                    <div>
                        <h2>CourseBuddy</h2>
                        <p>Learn. Grow. Succeed.</p>
                    </div>
                </div>

                <nav className="home-nav">
                    <Link to="/">Home</Link>
                    <Link to="/courses">Courses</Link>
                    <Link to="/login">Login</Link>
                    <Link className="register-button" to="/register">
                        Get Started
                    </Link>
                </nav>
            </header>

            <main className="home-content">
                <section className="home-hero">
                    <div className="home-hero-content">
                        <p className="hero-label">
                            YOUR LEARNING JOURNEY STARTS HERE
                        </p>

                        <h1>
                            Learn something new.
                            <br />
                            <span>Grow every day. ✨</span>
                        </h1>

                        <p className="home-description">
                            CourseBuddy helps you discover courses, track
                            your progress and stay organized throughout
                            your learning journey.
                        </p>

                        <div className="home-buttons">
                            <Link to="/register" className="primary-button">
                                Start Learning →
                            </Link>

                            <Link to="/courses" className="secondary-button">
                                Explore Courses
                            </Link>
                        </div>
                    </div>

                    <div className="home-illustration">
                        <div className="illustration-card">
                            <div className="floating-icon icon-one">📚</div>
                            <div className="floating-icon icon-two">✨</div>
                            <div className="floating-icon icon-three">🎓</div>

                            <div className="student-illustration">
                                👩🏻‍💻
                            </div>

                            <div className="book-illustration">
                                📖
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-courses">
                    <div className="section-heading">
                        <div>
                            <p className="section-label">LEARN YOUR WAY</p>
                            <h2>Popular Courses</h2>
                        </div>

                        <Link to="/courses">View all →</Link>
                    </div>

                    <div className="home-course-grid">
                        <div className="home-course-card">
                            <div className="home-course-icon">💻</div>
                            <span>WEB DEVELOPMENT</span>
                            <h3>Full Stack Development</h3>
                            <p>
                                Build modern websites and full-stack
                                applications.
                            </p>
                        </div>

                        <div className="home-course-card">
                            <div className="home-course-icon">🤖</div>
                            <span>AI & MACHINE LEARNING</span>
                            <h3>Artificial Intelligence</h3>
                            <p>
                                Explore AI concepts and machine learning
                                fundamentals.
                            </p>
                        </div>

                        <div className="home-course-card">
                            <div className="home-course-icon">🗄️</div>
                            <span>DATABASE</span>
                            <h3>Database Management</h3>
                            <p>
                                Learn how to manage and work with databases.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="home-features">
                    <div className="feature">
                        <strong>📈</strong>
                        <h3>Track Progress</h3>
                        <p>See how far you've come and keep improving.</p>
                    </div>

                    <div className="feature">
                        <strong>📅</strong>
                        <h3>Stay Organized</h3>
                        <p>Keep your courses and learning schedule together.</p>
                    </div>

                    <div className="feature">
                        <strong>🎯</strong>
                        <h3>Reach Your Goals</h3>
                        <p>Stay motivated and make learning a habit.</p>
                    </div>
                </section>
            </main>

            <footer className="home-footer">
                <p>© 2026 CourseBuddy. Learn. Grow. Succeed.</p>
            </footer>
        </div>
    );
}

export default Home;