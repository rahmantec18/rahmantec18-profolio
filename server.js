const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

console.log("EMAIL:", process.env.EMAIL_USER);
console.log("PASS LENGTH:", process.env.EMAIL_PASS?.length);

const contactController = require("./controllers/contactController");

const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ===============================
// Serve Frontend Files
// ===============================
app.use(express.static(path.join(__dirname)));

// ===============================
// Routes
// ===============================

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Appointment Form
app.post("/book-appointment", contactController.bookAppointment);

// Health Check
app.get("/health", (req, res) => {

    res.status(200).json({
        status: "Server Running",
        project: "PROFOLIO",
        success: true
    });

});

// 404
app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });

});

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log("=======================================");
    console.log("✅ PROFOLIO SERVER STARTED");
    console.log(`🚀 Running on http://localhost:${PORT}`);
    console.log("=======================================");

});