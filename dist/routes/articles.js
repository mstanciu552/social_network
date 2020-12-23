import express from "express";
import { db } from "../config.js";
var router = express.Router();
router.get("/", function (req, res) {
    db.query("select * from articles", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    });
});
router.get("/:id", function (req, res) {
    db.query("select * from articles where id=" + req.params.id, function (err, result) {
        if (err)
            throw err;
        return res.send(result);
    });
});
router.post("/", function (req, res) {
    var article = req.body;
    db.query("insert into articles(title, body, author) values ('" + article.title + "', '" + article.body + "', '" + article.author + "')", function (err, result) {
        if (err)
            throw err;
        console.log(result);
        return res.send("Article added");
    });
});
router.put("/:id", function (req, res) {
    var article = req.body;
    db.query("update articles set title='" + article.title + "', body='" + article.body + "' where id=" + req.params.id, function (err, result) {
        if (err)
            throw err;
        console.log(result);
        return res.send("Article edited");
    });
});
router.delete("/:id", function (req, res) {
    db.query("delete from articles where id=" + req.params.id, function (err, result) {
        if (err)
            throw err;
        console.log(result);
        return res.send("Article deleted");
    });
});
router.get("/user/:id", function (req, res) {
    db.query("select title, body from articles where articles.author=(select id from users where id=" + req.params.id + ")", function (err, result) {
        if (err)
            throw err;
        return res.send(result);
    });
});
// Dev utilities
router.delete("/", function (req, res) {
    db.query("delete from articles", function (err, result) {
        if (err)
            throw err;
        console.log(result);
        return res.send("All articles deleted");
    });
});
export default router;
