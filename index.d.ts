type Worker = {
  id: number;
  name: string;
  email: string;
  address: string;
};

type Activity = {
  id: number;
  employee_id: number;
  activity_name: string;
  start_time: string;
  end_stime?: string;
};
