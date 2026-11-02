function TopBar() {
    const student = JSON.parse(localStorage.getItem("student") || "{}");
    const studentName = student.name || student.fullName || "Student";

    return (
        <header className="topbar">
            <div className="topbar-welcome">
                <p>Welcome back!</p>
                <h1>Hey, {studentName}! 👋</h1>
            </div>

            <div className="topbar-actions">
                <input
                    type="text"
                    placeholder="Search courses..."
                />

                <button>🔔</button>
                <button>⚙️</button>
            </div>
        </header>
    );
}

export default TopBar;