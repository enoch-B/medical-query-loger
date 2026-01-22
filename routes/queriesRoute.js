import express from "express";
import { createQuery, getAllQueries } from "../controllers/queryController.js";

const router = express.Router();

router.post("/create", createQuery);
router.get("/get", getAllQueries);

export default router;
