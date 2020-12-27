import express, { Request, Response, Router } from "express";
import { db } from "../config.js";
import bcrypt from "bcrypt";
import auth from "./auth.js";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  db.query(`select * from users`, (err, result) => {
    if (err) throw err;
    return res.send(result);
  });
});

router.get("/:id", (req: Request, res: Response) => {
  db.query(`select * from users where id=${req.params.id}`, (err, result) => {
    if (err) throw err;
    return res.send(result);
  });
});

router.post("/", (req: Request, res: Response) => {
  const user = req.body;

  bcrypt.hash(user.pass, 10, (err, hash) => {
    if (err) throw err;
    console.log(hash);

    db.query(
      `insert into users(username, first_name, last_name, pass) values ('${user.username}', '${user.first_name}', '${user.last_name}', '${hash}')`,
      (err, result) => {
        if (err) throw err;
        console.log(result);
        return res.send("User added");
      }
    );
  });
});

router.put("/:id", (req: Request, res: Response) => {
  db.query(
    `update users set description='${req.body.description}' where id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      return res;
    }
  );
});

router.put("/:id", auth, (req: Request, res: Response) => {
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

router.delete("/:id", auth, (req: Request, res: Response) => {
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

router.get("/:id/articles/", auth, (req: Request, res: Response) => {
  db.query(
    `select title, body from articles where articles.id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});

// Comment handling
router.get("/:id/comments", (req: Request, res: Response) => {
  db.query(
    `select comment, article from comments where comments.author=(select id from users where id=${req.params.id})`,
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});

router.get("/:id/comments/:comment", (req: Request, res: Response) => {
  db.query(
    `select * from comments where id=${req.params.comment} and author=(select id from users where id=${req.params.id})`,
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});

// Dev utilities
router.delete("/", (req: Request, res: Response) => {
  db.query(`delete from users`, (err, result) => {
    if (err) throw err;
    return res.send("All users deleted");
  });
});

export default router;
