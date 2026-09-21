import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ForgotPassword() {
    return (
        <>
            <Navbar />

            <main>
                <h1>Forgot Password</h1>

                <form>
                    <input
                        type="email"
                        placeholder="Enter your email"
                    />

                    <button type="submit">
                        Reset Password
                    </button>
                </form>
            </main>

            <Footer />
        </>
    );
}

export default ForgotPassword;