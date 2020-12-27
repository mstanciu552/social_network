import express, { Router } from "express";
import users from "./users.js";
import articles from "./articles.js";
import login from "./auth.js";

const router: Router = express.Router();

router.use("/users", users);
router.use("/articles", articles);
router.use("/login", login);

export default router;
