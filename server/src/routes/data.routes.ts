import express from "express";
import { fetchProfile } from "../controllers/data.controller";
import { authenticateToken } from "../middleware/protectedRoutes";
const router = express.Router();

router.get("/profile", authenticateToken, fetchProfile);

export default router;
