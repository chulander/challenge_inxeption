export type Employee = {
  id: number;
  name: string;
  email: string | null;
  address: string | null;
};

export type Activity = {
  id: number;
  employee_id: number;
  activity_name: string;
  start_time: string;
  end_time: string | null;
};

export type EmployeePayload = Pick<Employee, "name"> &
  Pick<Partial<Employee>, "email" | "address">;

export type Params = Array<string | number | null>;

export type ActivityPayload = {
  action: "Start" | "Stop";
  name: Employee["name"];
  activity_name: Activity["activity_name"];
};
