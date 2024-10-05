import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./app/routes/auth.routes.js";
import calendarRoutes from "./app/routes/calendar.routes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// parse request of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
authRoutes(app);  // Register auth routes
app.use("/api/calendar", calendarRoutes);  // Register calendar routes

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/jay_db";
mongoose
    .connect(dbUrl)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.error("Cannot connect to the database!", err);
        process.exit();
    });

// Simple route
app.get("/", (req, res) => {
    res.send("Welcome to the application.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


