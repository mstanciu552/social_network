import express from "express";
import { db } from "../config.js";
var router = express.Router();
router.get("/", function (req, res) {
    db.query("select * from users", function (err, result) {
        if (err)
            throw err;
        return res.send(result);
    });
});
router.get("/:id", function (req, res) {
    db.query("select * from users where id=" + req.params.id, function (err, result) {
        if (err)
            throw err;
        return res.send(result);
    });
});
router.post("/", function (req, res) {
    var user = req.body;
    db.query("insert into users(username, first_name, last_name, pass, description) values ('" + user.username + "', '" + user.first_name + "', '" + user.last_name + "', '" + user.pass + "', '" + user.description + "')", function (err, result) {
        if (err)
            throw err;
        console.log(result);
        return res.send("User added");
    });
});
router.put("/:id", function (req, res) {
    db.query("update users set description='" + req.body.description + "' where id=" + req.params.id, function (err, result) {
        if (err)
            throw err;
        console.log(result);
        return res;
    });
});
router.put("/:id", function (req, res) {
    var user = req.body;
    db.query("update users set username='" + user.username + "', first_name='" + user.first_name + "', last_name='" + user.last_name + "' where id=" + req.params.id, function (err, result) {
        if (err)
            throw err;
        console.log(result);
        return res;
    });
});
router.delete("/:id", function (req, res) {
    db.query("delete from users where id=" + req.params.id, function (err, result) {
        if (err)
            throw err;
        db.query("delete from articles where articles.author=" + req.params.id, function (errArt, resArt) {
            if (errArt)
                throw errArt;
        });
        db.query("delete from comments where comments.author=" + req.params.id, function (errComm, resultComm) {
            if (errComm)
                throw errComm;
            console.log(resultComm);
            return res.send("User deleted");
        });
    });
});
router.get("/:id/articles/", function (req, res) {
    db.query("select title, body from articles where articles.id=" + req.params.id, function (err, result) {
        if (err)
            throw err;
        return res.send(result);
    });
});
// Comment handling
router.get("/:id/comments", function (req, res) {
    db.query("select comment, article from comments where comments.author=(select id from users where id=" + req.params.id + ")", function (err, result) {
        if (err)
            throw err;
        return res.send(result);
    });
});
router.get("/:id/comments/:comment", function (req, res) {
    db.query("select * from comments where id=" + req.params.comment + " and author=(select id from users where id=" + req.params.id + ")", function (err, result) {
        if (err)
            throw err;
        return res.send(result);
    });
});
// Dev utilities
router.delete("/", function (req, res) {
    db.query("delete from users", function (err, result) {
        if (err)
            throw err;
        return res.send("All users deleted");
    });
});
export default router;
