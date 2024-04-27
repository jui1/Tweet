import express from "express";
import { Login, Register, logout } from "../controllers/userControlers.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(logout);


export default router;
