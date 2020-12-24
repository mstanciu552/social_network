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
    db.query(
      `delete from comments where article=${req.params.id}`,
      (errComm, resComm) => {
        if (errComm) throw errComm;
      }
    );
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

// Comments on this article
router.get("/:id/comments", (req, res) => {
  db.query(
    `select comment from comments where comments.article=(select id from articles where id=${req.params.id})`,
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});

router.post("/:id/comments/", (req, res) => {
  const comment = req.body;
  db.query(
    `insert into comments(comment, author, article) values ('${comment.comment}', '${comment.author}', '${req.params.id}')`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.send("Comment added");
    }
  );
});

router.delete("/:id/comments/:comment", (req, res) => {
  db.query(
    `delete from comments where id=${req.params.comment}`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.send("Comment deleted");
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
