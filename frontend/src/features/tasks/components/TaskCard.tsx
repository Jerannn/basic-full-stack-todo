// components
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import TaskSheet from "./TaskSheet";

// icons
import { Plus } from "lucide-react";

// shadcn ui
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import type { Task } from "../types";
import { useLocation, useNavigate } from "react-router-dom";

type TaskCardProps = {
  data: Task[];
  title: string;
  isLoading?: boolean;
  isError?: boolean;
};

export default function TaskCard({
  data,
  title,
  isLoading = false,
  isError = false,
}: TaskCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const tasks = isDashboard ? data.slice(0, 5) : data;

  return (
    <Card
      className={`w-full mt-5 ${isDashboard ? "rounded-md" : "shadow-none border-none"}`}
    >
      <CardHeader>
        <CardTitle
          className={`flex justify-between gap-3 ${isDashboard ? "flex-col" : "flex-row"}`}
        >
          <h2 className="font-bold text-xl">{title}</h2>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" className="cursor-pointer rounded-sm">
                <Plus /> Add New Task
              </Button>
            </SheetTrigger>

            <TaskSheet title="Create task" description="Add a new task">
              <AddTask />
            </TaskSheet>
          </Sheet>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* loading */}
        {isLoading && <p className="text-center">Loading...</p>}

        {/* error */}
        {!isLoading && isError && (
          <p className="text-center">
            Something went wrong, please refresh the page
          </p>
        )}

        {/* no data message */}
        {!isLoading && data?.length === 0 && (
          <p className="text-center">No tasks found</p>
        )}

        {/* tasks list */}
        {!isLoading &&
          tasks?.map((task: Task) => {
            return <TaskItem task={task} key={task.id} />;
          })}
      </CardContent>

      {isDashboard && (
        <CardFooter className="self-end mt-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(`/${title.toLowerCase()}`)}
          >
            View all tasks
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
