const PDFDocument = require("pdfkit");
const crypto = require("crypto");

const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const LearningProgress = require("../models/LearningProgress");
const User = require("../models/User");

const downloadCertificate = async (req, res) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user.id;

        const [course, student, enrollment, progress] = await Promise.all([
            Course.findById(courseId),
            User.findById(studentId),
            Enrollment.findOne({ student: studentId, course: courseId }),
            LearningProgress.findOne({ student: studentId, course: courseId })
        ]);

        if (!course || !student || !enrollment || !progress) {
            return res.status(404).json({
                success: false,
                message: "Course completion details not found"
            });
        }

        if (
            enrollment.status !== "completed" ||
            course.lessons.length === 0 ||
            progress.progressPercentage !== 100 ||
            progress.completedLessons !== course.lessons.length
        ) {
            return res.status(403).json({
                success: false,
                message: "Complete all course lessons to download your certificate"
            });
        }

        const certificateId = crypto.randomUUID();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${course.courseCode}-Certificate.pdf"`
        );

        const doc = new PDFDocument({
            size: "A4",
            layout: "landscape",
            margin: 50
        });

        doc.pipe(res);

        doc.rect(20, 20, 802, 555).lineWidth(3).stroke("#2563eb");

        doc.fontSize(32)
            .fillColor("#1e3a8a")
            .text("CERTIFICATE OF COMPLETION", {
                align: "center",
                y: 110
            });

        doc.moveDown(2);

        doc.fontSize(18)
            .fillColor("#333333")
            .text("This certificate is proudly presented to", {
                align: "center"
            });

        doc.moveDown();

        doc.fontSize(30)
            .fillColor("#1d4ed8")
            .text(student.name, {
                align: "center"
            });

        doc.moveDown();

        doc.fontSize(18)
            .fillColor("#333333")
            .text("for successfully completing the course", {
                align: "center"
            });

        doc.moveDown();

        doc.fontSize(24)
            .fillColor("#1e3a8a")
            .text(course.courseName, {
                align: "center"
            });

        doc.moveDown(2);

        doc.fontSize(13)
            .fillColor("#555555")
            .text(`Completion Date: ${new Date().toLocaleDateString("en-IN")}`, {
                align: "center"
            });

        doc.text(`Certificate ID: ${certificateId}`, {
            align: "center"
        });

        doc.moveDown(2);

        doc.fontSize(15)
            .fillColor("#333333")
            .text("Student Course Management System", {
                align: "center"
            });

        doc.end();
    } catch (error) {
        console.error("Certificate generation error:", error.message);

        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: "Unable to generate certificate"
            });
        }
    }
};

module.exports = { downloadCertificate };