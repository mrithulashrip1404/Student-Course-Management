function WeeklySchedule() {
    return (
        <section className="weekly-schedule">
            <div className="section-heading">
                <div>
                    <p className="section-label">THIS WEEK</p>
                    <h2>Your Schedule</h2>
                </div>

                <span>View all</span>
            </div>

            <div className="schedule-list">
                <div className="schedule-item">
                    <span className="schedule-day">MON</span>
                    <div>
                        <h3>React Components</h3>
                        <p>10:00 AM • Full Stack Development</p>
                    </div>
                </div>

                <div className="schedule-item">
                    <span className="schedule-day">WED</span>
                    <div>
                        <h3>AI Fundamentals</h3>
                        <p>11:30 AM • Artificial Intelligence</p>
                    </div>
                </div>

                <div className="schedule-item">
                    <span className="schedule-day">FRI</span>
                    <div>
                        <h3>Database Practice</h3>
                        <p>2:00 PM • Database Management</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WeeklySchedule;