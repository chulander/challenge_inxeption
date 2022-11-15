import * as express from "express";
import db from "../db";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    // const data = await db.all("select * from mordor_worker");
    const data = await db.listWorkers();
    console.log("what is data", data);
    res.json({
      message: "success",
      data,
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
