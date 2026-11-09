
import { Link } from "react-router-dom";

function QuickActions() {
    const actions = [
        { icon: "📚", label: "Browse Courses", path: "/courses" },
        { icon: "📈", label: "View Progress", path: "/progress" },
        { icon: "🔔", label: "Notifications", path: "/notifications" },
        { icon: "🎯", label: "My Courses", path: "/my-courses" }
    ];

    return (
        <section className="quick-actions">
            <div className="section-heading">
                <div>
                    <p className="section-label">QUICK ACCESS</p>
                    <h2>What do you want to do?</h2>
                </div>
            </div>

            <div className="action-grid">
                {actions.map((action) => (
                    <Link
                        to={action.path}
                        className="quick-action-link"
                        key={action.path}
                    >
                        <span>{action.icon}</span>
                        <span>{action.label}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default QuickActions;
