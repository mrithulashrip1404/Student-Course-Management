function QuickActions() {
    return (
        <section className="quick-actions">
            <div className="section-heading">
                <div>
                    <p className="section-label">QUICK ACCESS</p>
                    <h2>What do you want to do?</h2>
                </div>
            </div>

            <div className="action-grid">
                <button>
                    📚
                    <span>Browse Courses</span>
                </button>

                <button>
                    📈
                    <span>View Progress</span>
                </button>

                <button>
                    🔔
                    <span>Notifications</span>
                </button>

                <button>
                    📝
                    <span>My Assignments</span>
                </button>
            </div>
        </section>
    );
}

export default QuickActions;