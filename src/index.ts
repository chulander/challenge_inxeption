import * as dotenv from "dotenv-safe";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import db from "./db";
import api from "./api";

dotenv.config();

const PORT: number = !process.env.PORT
  ? 3000
  : parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", api);

const server = app.listen(PORT, () => {
  console.info("express running on port", PORT);
});

server.on("error", console.error);

process.on("SIGINT", () => {
  db.close();
  server.close();
});
