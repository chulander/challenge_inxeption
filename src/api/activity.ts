import * as express from "express";
import db from "../db";

const router = express.Router();
router.get("/:id", async (req, res) => {
  try {
    const data = await db.getActivityByEmployeeId(Number(req.params.id));
    res.json({
      data,
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
router.get("/activites", async (req, res) => {
  try {
    const data = await db.listUniqueActivities();
    res.json({
      data,
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
router.post("/start", async (req, res) => {
  try {
    const { employee_id, activity_name } = req.body;
    const data = await db.startActivity(employee_id, activity_name);
    res.status(201).json(data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
router.post("/stop", async (req, res) => {
  try {
    const { employee_id } = req.body;
    const data = await db.stopActivity(employee_id);
    res.status(201).json(data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
