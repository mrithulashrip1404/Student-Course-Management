const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true,
            trim: true
        },
        courseCode: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        instructor: {
            type: String,
            required: true,
            trim: true
        },
        duration: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Course", courseSchema);