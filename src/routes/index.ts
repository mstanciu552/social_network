import express from "express";
import users from "./users.js";
import articles from "./articles.js";

const router = express.Router();

router.use("/users", users);
router.use("/articles", articles);

router.post("/", (req, res) => {});

export default router;
