export type CreateTaskInput = {
  title: string;
  description: string;
  category: string;
  dueDate: string;
};

export type Task = {
  readonly id: number;
  user_id: number;
  title: string;
  description: string;
  category: string;
  due_date: string;
  created_at: string;
};
