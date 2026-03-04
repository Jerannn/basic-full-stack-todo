import useTodayTasks from "../hooks/useTodayTasks";
import TaskCard from "./TaskCard";

export default function Today() {
  const { tasks, isLoading, isError } = useTodayTasks();

  return (
    <TaskCard
      data={tasks || []}
      isLoading={isLoading}
      isError={isError}
      title="Today"
    />
  );
}
