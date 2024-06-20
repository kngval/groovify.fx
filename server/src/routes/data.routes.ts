import express from "express";
import {
  fetchCurrentlyPlaying,
  fetchProfile,
  fetchTopTracks,
} from "../controllers/data.controller";
import { authenticateToken } from "../middleware/protectedRoutes";
const router = express.Router();

router.get("/profile", authenticateToken, fetchProfile);
router.get("/currently-playing", authenticateToken, fetchCurrentlyPlaying);
router.get("/top-tracks", authenticateToken, fetchTopTracks);

export default router;
