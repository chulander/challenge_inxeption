import * as dotenv from "dotenv-safe";
import sqlite3 from "sqlite3";
import * as query from "./query";
sqlite3.verbose();
dotenv.config();
// import { open } from "sqlite";

if (!process.env.DB_NAME) {
  console.log("missing DB_NAME");
  process.exit(1);
}
const DB: string = process.env.DB_NAME;

class Database {
  private db: sqlite3.Database;
  constructor(dbFilePath: string) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log("Could not connect to database", err);
      } else {
        console.log("Connected to database");

        console.log("Creating Table: mordor_worker");
        this.db.run(query.createWorkerTable, (err) => {
          if (err) {
            console.error(err.message);
          } else {
            // Table just created, creating some rows
            console.log("mordor_worker table created");
          }
        });
        console.log("Creating Table: worker_activity");
        this.db.run(query.createWorkerActivityTable, (err) => {
          if (err) {
            console.error(err.message);
            // Table already created
          } else {
            // Table just created, creating some rows
            console.log("worker_activty table created");
          }
        });
      }
    });
  }
  all(sql: string, params = []) {
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
  run(sql: string, params = []) {
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
  get(sql: string, params = []) {
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
  async listWorkers() {
    return this.db.all("select * from mordor_worker");
  }
}

const db = new Database(DB);
export default db;
