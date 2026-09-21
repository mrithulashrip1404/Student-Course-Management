import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminLogin() {
    return (
        <>
            <Navbar />

            <main>
                <h1>Administrator Login</h1>

                <form>
                    <input type="email" placeholder="Administrator Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </main>

            <Footer />
        </>
    );
}

export default AdminLogin;