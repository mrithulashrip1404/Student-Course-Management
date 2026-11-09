
import { Link } from "react-router-dom";

function HeroBanner({ continuePath = "/my-courses" }) {
    return (
        <section className="hero-banner">
            <div className="hero-content">
                <p className="hero-label">YOUR LEARNING JOURNEY</p>

                <h2>Keep learning, keep growing!</h2>

                <p>
                    Stay on track with your courses and make progress
                    toward your goals.
                </p>

                <Link to={continuePath} className="hero-button">
                    Continue Learning
                </Link>
            </div>

            <div className="hero-illustration" aria-hidden="true">
                🎓 📚 ✨
            </div>
        </section>
    );
}

export default HeroBanner;
