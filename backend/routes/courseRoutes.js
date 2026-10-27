const express = require("express");
const router = express.Router();

const {
    getCourses,
    getCourse,
    addCourse,
    editCourse,
    removeCourse
} = require("../controllers/courseController");

const validateCourse = require("../middleware/courseValidation");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course found
 *       404:
 *         description: Course not found
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseName
 *               - courseCode
 *               - instructor
 *               - duration
 *               - category
 *             properties:
 *               courseName:
 *                 type: string
 *               courseCode:
 *                 type: string
 *               instructor:
 *                 type: string
 *               duration:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created
 *       400:
 *         description: Missing required fields
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Course updated
 *       404:
 *         description: Course not found
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted
 *       404:
 *         description: Course not found
 */

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", authMiddleware, validateCourse, addCourse);
router.put("/:id", authMiddleware, editCourse);
router.delete("/:id", authMiddleware, removeCourse);


module.exports = router;