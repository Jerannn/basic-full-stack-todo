import useWeekTasks from "../hooks/useWeekTasks";
import TaskCard from "./TaskCard";

export default function Week() {
  const { tasks, isLoading, isError } = useWeekTasks();
  return (
    <TaskCard
      data={tasks || []}
      isLoading={isLoading}
      isError={isError}
      title="Week"
    />
  );
}
