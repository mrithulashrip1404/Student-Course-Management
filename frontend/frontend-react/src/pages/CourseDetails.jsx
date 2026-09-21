import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

function CourseDetails() {
    const { id } = useParams();

    return (
        <>
            <Navbar />

            <main>
                <h1>Course Details</h1>
                <p>Course ID: {id}</p>
                <p>View the details of the selected course.</p>
            </main>

            <Footer />
        </>
    );
}

export default CourseDetails;