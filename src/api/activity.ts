import * as express from "express";
import db from "../db";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const data = await db.listActivities();
    res.json({
      data,
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const data = await db.getActivityById(Number(req.params.id));
    res.json({
      data,
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
router.get("/employee/:employee_id", async (req, res) => {
  try {
    const data = await db.getActivityByEmployeeId(
      Number(req.params.employee_id)
    );
    res.json({
      data,
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
router.post("/", async (req, res) => {
  try {
    let data;
    const { name, activity_name, action } = req.body;
    if (action === "Start") {
      data = await db.startActivity(name, activity_name);
    } else if (action === "Stop") {
      data = await db.stopActivity(name);
    } else {
      throw new Error("action parameter not specified");
    }
    res.status(201).json(data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
