import * as express from "express";
import db from "../db";
import { Activity, ActivityPayload, Employee } from "../db/types";

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
    const { name, activity_name, action } = req.body as ActivityPayload;
    const [user] = (await db.getWorkerByName(name)) as Employee[];
    if (!user) {
      throw new Error(`employee ${name} does not exists`);
    }
    if (action === "Start") {
      const openedActivitites = (await db.getOpenedActivityByEmployeeId(
        user["id"]
      )) as Activity[];
      const startTime = new Date().toISOString();
      if (openedActivitites.length) {
        await db.stopActivity(user["id"], startTime);
      }
      data = await db.startActivity(user["id"], activity_name, startTime);
    } else if (action === "Stop") {
      data = await db.stopActivity(user["id"]);
    } else {
      throw new Error("action parameter not specified");
    }
    res.status(201).json(data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
