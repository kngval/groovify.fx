import express from "express";
import {
  fetchCurrentlyPlaying,
  fetchProfile,
  fetchTopArists,
  fetchTopTracks,
  fetchTopGenres
} from "../controllers/data.controller";
import { authenticateToken } from "../middleware/protectedRoutes";
const router = express.Router();
router.use(authenticateToken);
router.get("/profile", fetchProfile);
router.get("/currently-playing", fetchCurrentlyPlaying);
router.get("/top-tracks", fetchTopTracks);
router.get("/top-artists", fetchTopArists);
router.get("/top-genres", fetchTopGenres);
router.get("/greet",)
export default router;
