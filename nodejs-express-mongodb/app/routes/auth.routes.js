import express from "express";
import { signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

const authRoutes = (app) => {
    app.use('/api/auth', router);
};

export default authRoutes;