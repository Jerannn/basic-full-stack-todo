import TaskSection from "@/components/dashboard/task/TaskSection";

const data = [
  {
    title: "Title",
    description: "Description",
  },
  {
    title: "Title",
    description: "Description",
  },
  {
    title: "Title",
    description: "Description",
  },
];

export default function Dashboard() {
  return (
    <div className="px-5">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <TaskSection data={data} title="Today" />

      <div className="flex gap-3">
        <TaskSection data={data} title="Tommorow" />
        <TaskSection data={data} title="This Week" />
      </div>
    </div>
  );
}
