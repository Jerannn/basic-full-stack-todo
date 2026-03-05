import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import type { Task } from "../types";
import { formatToYMD } from "@/lib/utils";
import { CalendarX } from "lucide-react";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type TaskDetailsProps = {
  task: Task;
};

export default function TaskDetails({ task }: TaskDetailsProps) {
  return (
    <div className="px-4">
      <FieldGroup>
        <FieldSet>
          <FieldGroup className="gap-2">
            <FieldLabel>Task title</FieldLabel>
            <FieldDescription>{task.title}</FieldDescription>
          </FieldGroup>

          <FieldGroup className="gap-2">
            <FieldLabel>Description</FieldLabel>
            <FieldDescription>{task.description}</FieldDescription>
          </FieldGroup>

          <FieldGroup className="gap-2">
            <FieldLabel>
              Due date <CalendarX size={17} />
            </FieldLabel>

            <FieldDescription>
              <span className="text-xs">{formatToYMD(task.due_date)}</span>
            </FieldDescription>
          </FieldGroup>

          <FieldGroup className="gap-2">
            <FieldLabel>Category</FieldLabel>
            <FieldDescription className="flex items-center gap-1">
              <span className="block bg-red-800 w-3 h-3 rounded-[3px]"></span>
              {task.category}
            </FieldDescription>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>

      <SheetFooter className="flex flex-row-reverse gap-2">
        <Button type="submit" form="task-form" disabled={false}>
          Edit task
        </Button>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </div>
  );
}
