const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    order: {
        type: Number,
        required: true,
        min: 1
    }
});

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
        lessons: {
            type: [lessonSchema],
            default: []
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