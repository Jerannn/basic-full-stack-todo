import Today from "@/features/tasks/components/Today";
import Tomorrow from "@/features/tasks/components/Tomorrow";
import Week from "@/features/tasks/components/Week";

export default function Dashboard() {
  return (
    <div className="px-5 pb-5">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <Today />

      <div className="flex gap-5">
        <Tomorrow />
        <Week />
      </div>
    </div>
  );
}
