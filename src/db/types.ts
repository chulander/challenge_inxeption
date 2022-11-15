export type Worker = {
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

export type Params = Array<string | number | null>;
