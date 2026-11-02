const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { Server } = require("socket.io");

const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");
const createAdmin = require("./services/adminSetup");
const connectDB = require("./config/db");
const seedCourses = require("./services/courseSetup");
const socketAuth = require("./middleware/socketAuth");
const socketHandler = require("./socket/socketHandler");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5174", "http://localhost:5175"],
        methods: ["GET", "POST"]
    }
});

app.set("io", io);

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Student Course Management API",
            version: "1.0.0",
            description: "API documentation for managing courses"
        },
        servers: [{ url: "http://localhost:5000" }]
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const allowedOrigins = [
    "http://localhost:5174",
    "http://localhost:5175"
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({ message: "Student Course Management API is running" });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is healthy",
        timestamp: new Date().toISOString()
    });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/courses", courseRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

io.use(socketAuth);
socketHandler(io);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        await createAdmin();
        await seedCourses();

        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log("Socket.IO server is ready");
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();