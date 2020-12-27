import express, { NextFunction, Request, Response, Router } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { db, envConfig } from "../config.js";

envConfig();

const router: Router = express.Router();

const accessSecretToken: Secret = <Secret>process.env.JWT_SECRET;

router.post("/", (req: Request, res: Response): void => {
  const { username, pass } = req.body;

  db.query(
    `select id, username, pass from users where users.username='${username}' and users.pass='${pass}'`,
    (err, result) => {
      if (err) throw err;
      const accessToken = jwt.sign(
        { id: result[0].id, username: result[0].username },
        accessSecretToken
      );
      res.json({ accessToken });
    }
  );
});

const auth = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.header["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, <Secret>process.env.JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export default router;
