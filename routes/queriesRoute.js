import express from "express";
import { createQuery, getAllQueries } from "../controllers/queryController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/create", authenticate, createQuery);
router.get("/get", authenticate, getAllQueries);

export default router;
