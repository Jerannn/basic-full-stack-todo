// components
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import TaskSheet from "./TaskSheet";

// icons
import { Plus } from "lucide-react";

// shadcn ui
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

type TaskSectionProps = {
  data: any;
  title: string;
};

export default function TaskSection({ data, title }: TaskSectionProps) {
  return (
    <Card className="w-full mt-5 shadow-sm rounded-md">
      <CardHeader>
        <CardTitle className="flex flex-col justify-between gap-3">
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
        {data.map((task: any, i: number) => {
          return <TaskItem task={task} key={i} />;
        })}
      </CardContent>
    </Card>
  );
}
