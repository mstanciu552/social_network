import express, { NextFunction, Request, Response, Router } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { db, envConfig } from "../config.js";
import bcrypt from "bcrypt";

envConfig();

const router: Router = express.Router();

const accessSecretToken: Secret = <Secret>process.env.JWT_SECRET;

router.post("/", (req: Request, res: Response): void => {
  const { username, pass } = req.body;

  console.log(username, pass);

  db.query(
    `select * from users where username='${username}'`,
    (err, result) => {
      if (err) throw err;
      bcrypt.compare(pass, result[0].pass, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          const accessToken = jwt.sign(
            { id: result[0].id, username: result[0].username },
            accessSecretToken
          );
          res.json({ accessToken });
        } else {
          return res.send("Invalid Credentials");
        }
      });
    }
  );
});

export const auth = (req: any, res: Response, next: NextFunction) => {
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
