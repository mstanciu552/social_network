import express from "express";
import users from "./users.js";
import articles from "./articles.js";
import login from "./auth.js";

const router = express.Router();

router.use("/users", users);
router.use("/articles", articles);
router.use("/login", login);

export default router;
