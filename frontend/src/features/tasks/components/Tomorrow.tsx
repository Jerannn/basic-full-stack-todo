import useTomorrowTasks from "../hooks/useTomorrowTasks";
import TaskCard from "./TaskCard";

export default function Tomorrow() {
  const { tasks, isLoading, isError } = useTomorrowTasks();
  return (
    <TaskCard
      data={tasks?.slice(0, 5) || []}
      isLoading={isLoading}
      isError={isError}
      title="Tomorrow"
    />
  );
}
