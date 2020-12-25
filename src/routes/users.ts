import express from "express";
import { db } from "../config.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query(`select * from users`, (err, result) => {
    if (err) throw err;
    return res.send(result);
  });
});

router.get("/:id", (req, res) => {
  db.query(`select * from users where id=${req.params.id}`, (err, result) => {
    if (err) throw err;
    return res.send(result);
  });
});

router.post("/", (req, res) => {
  const user = req.body;
  db.query(
    `insert into users(username, first_name, last_name, pass, description) values ('${user.username}', '${user.first_name}', '${user.last_name}', '${user.pass}', '${user.description}')`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.send("User added");
    }
  );
});

router.put("/:id", (req, res) => {
  db.query(
    `update users set description='${req.body.description}' where id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      return res;
    }
  );
});

router.put("/:id", (req, res) => {
  const user = req.body;
  db.query(
    `update users set username='${user.username}', first_name='${user.first_name}', last_name='${user.last_name}' where id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      return res;
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(`delete from users where id=${req.params.id}`, (err, result) => {
    if (err) throw err;
    db.query(
      `delete from articles where articles.author=${req.params.id}`,
      (errArt, resArt) => {
        if (errArt) throw errArt;
      }
    );
    db.query(
      `delete from comments where comments.author=${req.params.id}`,
      (errComm, resultComm) => {
        if (errComm) throw errComm;
        console.log(resultComm);
        return res.send("User deleted");
      }
    );
  });
});

router.get("/:id/articles/", (req, res) => {
  db.query(
    `select title, body from articles where articles.id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});

// Comment handling
router.get("/:id/comments", (req, res) => {
  db.query(
    `select comment, article from comments where comments.author=(select id from users where id=${req.params.id})`,
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});

router.get("/:id/comments/:comment", (req, res) => {
  db.query(
    `select * from comments where id=${req.params.comment} and author=(select id from users where id=${req.params.id})`,
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});

// Authentication
router.post("/login", (req, res) => {
  var user;
  db.query(
    `select username, pass from users where users.username='${req.body.username}'`,
    (err, result) => {
      if (err) throw err;
      user = result;
    }
  );
});

// Dev utilities
router.delete("/", (req, res) => {
  db.query(`delete from users`, (err, result) => {
    if (err) throw err;
    return res.send("All users deleted");
  });
});

export default router;
