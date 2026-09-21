import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
    return (
        <>
            <Navbar />

            <main>
                <h1>Student Login</h1>

                <form>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </main>

            <Footer />
        </>
    );
}

export default Login;