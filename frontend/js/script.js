import { validateRequiredFields } from "./validation.js";
import { login, register, logout } from "./auth.js";
import { showMessage, confirmAction } from "./ui.js";

document.addEventListener("DOMContentLoaded", function () {

    // Registration Form Validation
    const registerForm = document.querySelector("#registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!validateRequiredFields([name, email, password])) {

                showMessage("Please fill all the fields.");
                event.preventDefault();

            } else {

                register(name, email);

                showMessage("Registration Successful!");

            }

        });

    }


    // Student Login Validation
    const studentLogin = document.querySelector("#studentLogin");

    if (studentLogin) {

        studentLogin.addEventListener("submit", function (event) {

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!validateRequiredFields([email, password])) {

                showMessage("Enter Email and Password.");
                event.preventDefault();

            } else {

                login(email);

                showMessage("Login Successful!");

            }

        });

    }


    // Admin Login Validation
    const adminLogin = document.querySelector("#adminLogin");

    if (adminLogin) {

        adminLogin.addEventListener("submit", function (event) {

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!validateRequiredFields([email, password])) {

                showMessage("Enter Administrator Credentials.");
                event.preventDefault();

            } else {

                login(email);

                showMessage("Administrator Login Successful!");

            }

        });

    }


    // Forgot Password
    const forgotForm = document.querySelector("#forgotForm");

    if (forgotForm) {

        forgotForm.addEventListener("submit", function () {

            showMessage("Password Reset Link Sent.");

        });

    }


    // Logout Confirmation
    const logoutBtn = document.querySelector(".logout");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function (event) {

            const confirmLogout = confirmAction(
                "Are you sure you want to logout?"
            );

            if (!confirmLogout) {

                event.preventDefault();

            } else {

                logout();

            }

        });

    }

});
