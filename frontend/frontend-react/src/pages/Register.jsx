import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
    return (
        <>
            <Navbar />

            <main>
                <h1>Student Registration</h1>

                <form>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Register</button>
                </form>
            </main>

            <Footer />
        </>
    );
}

export default Register;