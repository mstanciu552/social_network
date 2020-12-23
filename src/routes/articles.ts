import express from "express";
import { db } from "../config.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("select * from articles", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  db.query(
    `select * from articles where id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});

router.post("/", (req, res) => {
  const article = req.body;
  db.query(
    `insert into articles(title, body, author) values ('${article.title}', '${article.body}', '${article.author}')`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.send("Article added");
    }
  );
});

router.put("/:id", (req, res) => {
  const article = req.body;
  db.query(
    `update articles set title='${article.title}', body='${article.body}' where id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.send("Article edited");
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(`delete from articles where id=${req.params.id}`, (err, result) => {
    if (err) throw err;
    console.log(result);
    return res.send("Article deleted");
  });
});

router.get("/user/:id", (req, res) => {
  db.query(
    `select title, body from articles where articles.author=(select id from users where id=${req.params.id})`,
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});

// Dev utilities
router.delete("/", (req, res) => {
  db.query(`delete from articles`, (err, result) => {
    if (err) throw err;
    console.log(result);
    return res.send("All articles deleted");
  });
});

export default router;
