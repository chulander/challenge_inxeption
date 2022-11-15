import * as express from "express";
import db from "../db";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const { id, name } = req.query;
    let data;
    if (id) {
      data = await db.getWorkerById(Number(id as string));
    } else if (name) {
      data = await db.getWorkerByName(name as string);
    } else {
      data = await db.listWorkers();
    }
    res.json({
      data,
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const data = await db.createWorker(name, email, address);
    res.status(201).json(data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
