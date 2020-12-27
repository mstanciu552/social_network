import express from "express";
import jwt from "jsonwebtoken";
import { db, envConfig } from "../config.js";
import bcrypt from "bcrypt";
envConfig();
var router = express.Router();
var accessSecretToken = process.env.JWT_SECRET;
router.post("/", function (req, res) {
    var _a = req.body, username = _a.username, pass = _a.pass;
    console.log(username, pass);
    db.query("select * from users where username='" + username + "'", function (err, result) {
        if (err)
            throw err;
        bcrypt.compare(pass, result[0].pass, function (err, isMatch) {
            if (err)
                throw err;
            if (isMatch) {
                var accessToken = jwt.sign({ id: result[0].id, username: result[0].username }, accessSecretToken);
                res.json({ accessToken: accessToken });
            }
            else {
                return res.send("Invalid Credentials");
            }
        });
    });
});
export var auth = function (req, res, next) {
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
