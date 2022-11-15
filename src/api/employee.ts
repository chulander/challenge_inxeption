import * as express from "express";
import db from "../db";
import { EmployeePayload } from "../db/types";

const router = express.Router();
router.get("/:id", async (req, res) => {
  try {
    const data = await db.employeeGetById(Number(req.params.id));
    res.json({
      data,
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { name, email, address }: EmployeePayload = req.body;
    const data = await db.employeeCreate(name, email, address);
    res.status(201).json(data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
