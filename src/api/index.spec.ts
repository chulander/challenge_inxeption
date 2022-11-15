import { app } from "../index";
import request from "supertest";
import { Activity, Employee } from "../db/types";
import db from "../db";

const testUser = "employeeUser";
const employeeID = 1;
const activity_1 = "testing_endpoint";
const activity_2 = "testing_endpoint2";
describe("testing endpoints", () => {
  beforeAll(async () => {
    await db.dropTables();
    await db.createTables();
  });
  afterAll(async () => {
    await db.close();
  });
  describe("employee endpoints", () => {
    it("creating a employee should return 201", async () => {
      const res = await request(app).post(`/api/employee`).send({
        name: testUser,
      });
      expect(res.status).toBe(201);
    });
    it("should find an existing user", async () => {
      const [employee] = (await db.employeeGetByName(testUser)) as Employee[];
      const expected = {
        id: employeeID,
        NAME: testUser,
        ADDRESS: null,
        EMAIL: null,
      };
      expect(employee).toMatchObject(expected);
    });
  });
  describe("activity endpoints", () => {
    it("creating an activity without a valid employee_id should return 400", async () => {
      const res = await request(app).post("/api/activity").send({
        name: "NON EXISTING USER",
        activity_name: "testing endpoint",
        action: "Start",
      });
      expect(res.status).toBe(400);
    });
    it("creating an activity with should return 201", async () => {
      const res = await request(app).post("/api/activity").send({
        name: testUser,
        activity_name: activity_1,
        action: "Start",
      });
      expect(res.status).toBe(201);
    });
    it("starting a new activity should stop previous activity and set current time", async () => {
      await request(app).post("/api/activity").send({
        name: testUser,
        activity_name: activity_2,
        action: "Start",
      });
      const [act1, act2] = (await db.activityGetByEmployeeId(
        employeeID
      )) as Activity[];
      expect(act1.end_time).toEqual(act2.start_time);
      const result = (await db.activityOpenedByEmployeeId(1)) as Activity[];
      expect(result.length).toBe(1);
    });
    it("stopping an activity should return 200", async () => {
      await request(app).post("/api/activity").send({
        name: testUser,
        activity_name: activity_2,
        action: "Stop",
      });
      const result = (await db.activityOpenedByEmployeeId(1)) as Activity[];
      expect(result.length).toBe(0);
    });
    it("activity action should error if action is not 'Start' nor 'Stop'", async () => {
      const res = await request(app).post("/api/activity").send({
        name: testUser,
        activity_name: activity_2,
        action: "UNKNOWN",
      });
      expect(res.status).toBe(400);
    });
  });
});
