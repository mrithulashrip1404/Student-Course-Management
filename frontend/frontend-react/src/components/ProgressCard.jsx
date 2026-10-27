function ProgressCard() {
    return (
        <section className="progress-card">
            <div className="section-heading">
                <div>
                    <p className="section-label">YOUR PROGRESS</p>
                    <h2>Keep up the great work! 🌟</h2>
                </div>
            </div>

            <div className="progress-content">
                <div className="progress-circle">
                    <strong>72%</strong>
                    <span>Completed</span>
                </div>

                <div className="progress-info">
                    <h3>You're making great progress!</h3>
                    <p>
                        Keep completing your lessons and assignments
                        to reach your learning goals.
                    </p>

                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProgressCard;