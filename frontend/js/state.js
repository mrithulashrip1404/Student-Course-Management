let appState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    selectedCourse: JSON.parse(localStorage.getItem("selectedCourse")) || null
};

export function getState() {
    return appState;
}

export function setUser(user) {
    appState.user = user;
    localStorage.setItem("user", JSON.stringify(user));
}

export function setSelectedCourse(course) {
    appState.selectedCourse = course;
    localStorage.setItem("selectedCourse", JSON.stringify(course));
}

export function clearState() {
    appState.user = null;
    appState.selectedCourse = null;

    localStorage.removeItem("user");
    localStorage.removeItem("selectedCourse");
}