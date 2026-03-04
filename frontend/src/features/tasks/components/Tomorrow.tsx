import useTomorrowTasks from "../hooks/useTomorrowTasks";
import TaskCard from "./TaskCard";

export default function Tomorrow() {
  const { tasks, isLoading, isError } = useTomorrowTasks();
  return (
    <TaskCard
      data={tasks || []}
      isLoading={isLoading}
      isError={isError}
      title="Tomorrow"
    />
  );
}
