import express from "express";
import { Login, Register, bookmark, follow, getMyProfile, getOtherUsers, logout, unfollow } from "../controllers/userControlers.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(bookmark)
router.route("/profile/:id").get(getMyProfile)
router.route("/otheruser/id").get(getOtherUsers)
router.route("/follow/:id").post(follow)
router.route("/unfollow/:id").post(unfollow)


export default router;
