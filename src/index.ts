import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { configdb } from "./config.js";
import routes from "./routes/index.js";

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Config DB
configdb();

// Routes
app.use("/", routes);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
