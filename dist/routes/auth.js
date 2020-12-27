import express from "express";
import jwt from "jsonwebtoken";
import { db, envConfig } from "../config.js";
envConfig();
var router = express.Router();
var accessSecretToken = process.env.JWT_SECRET;
router.post("/", function (req, res) {
    var _a = req.body, username = _a.username, pass = _a.pass;
    db.query("select id, username, pass from users where users.username='" + username + "' and users.pass='" + pass + "'", function (err, result) {
        if (err)
            throw err;
        var accessToken = jwt.sign({ id: result[0].id, username: result[0].username }, accessSecretToken);
        res.json({ accessToken: accessToken });
    });
});
var auth = function (req, res, next) {
    var authHeader = req.header["authorization"];
    var token = authHeader && authHeader.split(" ")[1];
    if (token === null)
        return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
};
export default router;
