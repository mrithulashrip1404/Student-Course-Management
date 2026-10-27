function TopBar() {
    return (
        <header className="topbar">
            <div className="topbar-welcome">
                <p>Welcome back!</p>
                <h1>Hey, Priya! 👋</h1>
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