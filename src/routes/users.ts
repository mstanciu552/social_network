import express from "express";
import { db } from "../config.js";

const router = express.Router();

router.get("/", async (req, res) => {
  await db.query("select * from users;", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/:id", async (req, res) => {
  await db.query(
    `select * from users where id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});

router.post("/", async (req, res) => {
  const user = req.body;
  await db.query(
    `insert into users(first_name, last_name, pass ${
      user.article ? ", article" : ""
    }) values ('${user.first_name}', '${user.last_name}', '${user.pass}'${
      user.article ? user.article : ""
    })`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.send("User added");
    }
  );
});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

export default router;
