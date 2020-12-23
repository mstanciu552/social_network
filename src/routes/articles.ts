import express from "express";
import { db } from "../config.js";

const router = express.Router();

router.get("/", async (req, res) => {
  await db.query("select * from articles;", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/:id", async (req, res) => {
  await db.query(
    `select * from articles where id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});

router.post("/", async (req, res) => {
  const article = req.body;
  await db.query(
    `insert into articles(title, body) values (${article.title}, ${article.body})`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
    }
  );
});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

export default router;
