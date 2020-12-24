import express from "express";
import users from "./users.js";
import articles from "./articles.js";
var router = express.Router();
router.use("/users", users);
router.use("/articles", articles);
router.post("/", function (req, res) { });
export default router;
