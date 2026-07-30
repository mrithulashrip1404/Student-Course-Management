// ===========================
// Student Course Management System
// script.js
// ===========================

// Execute after page loads
document.addEventListener("DOMContentLoaded", function () {

    // ---------------------------
    // Registration Form Validation
    // ---------------------------
    const registerForm = document.querySelector("#registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (name === "" || email === "" || password === "") {

                alert("Please fill all the fields.");
                event.preventDefault();

            }
            else {

                alert("Registration Successful!");

            }

        });

    }

    // ---------------------------
    // Student Login Validation
    // ---------------------------
    const studentLogin = document.querySelector("#studentLogin");

    if (studentLogin) {

        studentLogin.addEventListener("submit", function (event) {

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (email === "" || password === "") {

                alert("Enter Email and Password.");
                event.preventDefault();

            }
            else {

                alert("Login Successful!");

            }

        });

    }

    // ---------------------------
    // Admin Login Validation
    // ---------------------------
    const adminLogin = document.querySelector("#adminLogin");

    if (adminLogin) {

        adminLogin.addEventListener("submit", function (event) {

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (email === "" || password === "") {

                alert("Enter Administrator Credentials.");
                event.preventDefault();

            }
            else {

                alert("Administrator Login Successful!");

            }

        });

    }

    // ---------------------------
    // Forgot Password
    // ---------------------------
    const forgotForm = document.querySelector("#forgotForm");

    if (forgotForm) {

        forgotForm.addEventListener("submit", function (event) {

            alert("Password Reset Link Sent.");

        });

    }

    // ---------------------------
    // Logout Confirmation
    // ---------------------------
    const logoutBtn = document.querySelector(".logout");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function (event) {

            const confirmLogout = confirm("Are you sure you want to logout?");

            if (!confirmLogout) {

                event.preventDefault();

            }

        });

    }

});
