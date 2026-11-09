
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function TopBar() {
    const student = JSON.parse(localStorage.getItem("student") || "{}");
    const studentName = student.name || student.fullName || "Student";

    const navigate = useNavigate();
    const location = useLocation();

    const [search, setSearch] = useState(
        new URLSearchParams(location.search).get("search") || ""
    );

    const handleSearch = (e) => {
        e.preventDefault();

        navigate(
            search.trim()
                ? `/courses?search=${encodeURIComponent(search.trim())}`
                : "/courses"
        );
    };

    return (
        <header className="topbar">
            <div className="topbar-welcome">
                <p>Welcome back!</p>
                <h1>Hey, {studentName}! 👋</h1>
            </div>

            <div className="topbar-actions">
                <form onSubmit={handleSearch}>
                    <input
                        type="search"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" aria-label="Search courses">
                        🔍
                    </button>
                </form>

                <Link to="/notifications" aria-label="Notifications">
                    🔔
                </Link>

                <Link to="/settings" aria-label="Settings">
                    ⚙️
                </Link>
            </div>
        </header>
    );
}

export default TopBar;