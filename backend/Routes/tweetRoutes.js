import express from "express" ;
import { createTweet, deeleteTweet } from "../controllers/TweetController.js";
import isAuthenticated from "../config/auth.js"

const router = express.Router();

router.route("/create").post(isAuthenticated,createTweet)
router.route("/delete/:id").delete(isAuthenticated, deeleteTweet );

export default router;