import express from "express";
import { create, findAll, share } from "../controllers/calendar.controller.js";

const router = express.Router();

// Create a new Event
router.post("/", create);

// Retrieve all Events
router.get("/", findAll);

// Share an Event
router.put("/share/:id", share);

export default router;