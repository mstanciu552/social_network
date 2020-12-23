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
    `insert into users(first_name, last_name, pass) values ('${user.first_name}', '${user.last_name}', '${user.pass}')`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.send("User added");
    }
  );
});

router.put("/:id", (req, res) => {
  const user = req.body;
  db.query(
    `update users set first_name='${user.first_name}', last_name='${user.last_name}' where id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.sendStatus(200);
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(`delete from users where id=${req.params.id}`, (err, result) => {
    if (err) throw err;
    return res.send("User deleted").sendStatus(200);
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

// Dev utilities
router.delete("/", (req, res) => {
  db.query(`delete from users`, (err, result) => {
    if (err) throw err;
    return res.send("All users deleted").sendStatus(200);
  });
});

export default router;
