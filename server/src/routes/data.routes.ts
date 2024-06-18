import express from "express";
import {
  fetchCurrentlyPlaying,
  fetchProfile,
} from "../controllers/data.controller";
import { authenticateToken } from "../middleware/protectedRoutes";
const router = express.Router();

router.get("/profile", authenticateToken, fetchProfile);
router.get("/currently-playing", authenticateToken, fetchCurrentlyPlaying);

export default router;
