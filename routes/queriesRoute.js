import express from "express";
import { createQuery, getAllQueries } from "../controllers/queryController.js";
import { authenticate } from "../middleware/authenticate.js";
import { uploadFile, getFile } from "../controllers/queryController.js";

const router = express.Router();

router.post("/create", authenticate, createQuery);
router.get("/get", authenticate, getAllQueries);
router.post("/upload", authenticate, uploadFile);
router.get("/file/:id", authenticate, getFile);

export default router;
