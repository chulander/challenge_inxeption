export const createWorkerTable = `CREATE TABLE mordor_worker (
    id INTEGER PRIMARY KEY,
    NAME TEXT NOT NULL,
    EMAIL TEXT,
    ADDRESS TEXT
    );`;

export const createWorkerActivityTable =
  "CREATE TABLE worker_activity (id INTEGER PRIMARY KEY, employee_id integer, activity_name text, start_time text, end_time text, CONSTRAINT fk_emp_id FOREIGN KEY(employee_id) REFERENCES mordor_worker(id) );";

export const listUniqueActivities = `SELECT DISTINCT activity_name name FROM worker_activity ORDER BY name`;
