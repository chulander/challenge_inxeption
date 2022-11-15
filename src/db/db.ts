import * as dotenv from "dotenv-safe";
import sqlite3 from "sqlite3";
import { Worker, Activity, Params } from "./types";
sqlite3.verbose();
dotenv.config();

if (!process.env.DB_NAME) {
  console.log("missing DB_NAME");
  process.exit(1);
}
const DB: string = process.env.DB_NAME;

class Database {
  private db: sqlite3.Database;
  constructor(dbFilePath: string) {
    this.db = new sqlite3.Database(dbFilePath, async (err) => {
      if (err) {
        console.log("Could not connect to database", err);
      } else {
        console.log("Connected to database");
        console.log("Creating Table: mordor_worker");
        await this.createWorkerTable();
        console.log("Creating Table: worker_activity");
        await this.createWorkerActivityTable();
      }
    });
  }
  private async createWorkerTable() {
    return this.db.run(
      "CREATE TABLE IF NOT EXISTS mordor_worker ( id INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL, EMAIL TEXT, ADDRESS TEXT  );"
    );
  }
  private async createWorkerActivityTable() {
    return this.db.run(
      "CREATE TABLE IF NOT EXISTS worker_activity (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id integer, activity_name text, start_time text, end_time text, CONSTRAINT fk_emp_id FOREIGN KEY(employee_id) REFERENCES mordor_worker(id) );"
    );
  }
  private all(sql: string, params: Params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  private run(sql: string, params: Params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log("Error running sql " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }
  private get(sql: string, params: Params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve("db closed");
        }
      });
    });
  }
  createWorker(
    name: Worker["name"],
    email: Worker["email"] = null,
    address: Worker["address"] = null
  ) {
    return this.run(
      "INSERT INTO mordor_worker(name, email, address) values (?, ?, ?)",
      [name, email, address]
    );
  }
  async startActivity(
    employee_id: Activity["employee_id"],
    activity_name: Activity["activity_name"]
  ) {
    const start_time = new Date().toISOString();
    const data = (await this.getActivityByEmployeeId(
      employee_id
    )) as Array<Activity>;
    if (data.length) {
      await this.stopActivity(employee_id, start_time);
    }

    return this.run(
      "INSERT INTO worker_activity(employee_id, activity_name, start_time) values(?,?,?)",
      [employee_id, activity_name, start_time]
    );
  }
  stopActivity(
    employee_id: Activity["employee_id"],
    end_time: Activity["end_time"] = new Date().toISOString()
  ) {
    return this.run(
      "UPDATE worker_activity set end_time=? where employee_id=? AND end_time is NULL",
      [end_time, employee_id]
    );
  }
  getWorkerById(id: Worker["id"]) {
    return this.all("SELECT * FROM mordor_worker WHERE id = ?", [id]);
  }
  getWorkerByName(name: Worker["name"]) {
    console.log("getworkercall", name);
    return this.all("SELECT * FROM mordor_worker WHERE name = ?", [name]);
  }
  listWorkers(name?: Worker["name"]) {
    return !name
      ? this.all("select * from mordor_worker")
      : this.getWorkerByName(name);
  }
  getActivityByEmployeeId(employee_id: number) {
    return this.all("select * from worker_activity where employee_id = ?", [
      employee_id,
    ]);
  }
  listUniqueActivities() {
    return this.all(
      "SELECT activity_name name FROM worker_activity GROUP BY activity_name ORDER BY name"
    );
  }
}

const db = new Database(DB);
export default db;
