// hooks
import { useState } from "react";

// icons
import {
  CalendarX,
  EllipsisVertical,
  PencilIcon,
  ShareIcon,
  SquareChartGantt,
  TrashIcon,
} from "lucide-react";

// shadcn ui
import { Button } from "../../../components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "../../../components/ui/item";
import { Checkbox } from "../../../components/ui/checkbox";
import { Sheet, SheetTrigger } from "../../../components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TaskSheet from "./TaskSheet";
import { formatToYMD } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import type { Task } from "../types";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const [openSheet, setOpenSheet] = useState("");
  return (
    <Item
      variant="outline"
      className="border-gray-100 border-l-0 border-r-0 border-b-0 rounded-none"
    >
      <ItemActions>
        <Checkbox />
      </ItemActions>

      <ItemContent className="gap-2">
        <ItemTitle className="text-base line-clamp-1">{task.title}</ItemTitle>
        <ItemGroup className="flex-row gap-2 h-4">
          <ItemGroup className="flex-row items-center gap-1">
            <CalendarX size={17} />
            <span className="text-xs">{formatToYMD(task.due_date)}</span>
          </ItemGroup>
          <Separator orientation="vertical" />
          <ItemGroup className="flex-row items-center gap-1">
            <span className="block bg-red-800 w-3 h-3 rounded-[3px]"></span>
            <span className="text-xs">{task.category}</span>
          </ItemGroup>
        </ItemGroup>
      </ItemContent>

      <ItemActions>
        <Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="focus-visible:ring-0">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                <SheetTrigger asChild>
                  <DropdownMenuItem onClick={() => setOpenSheet("view")}>
                    <SquareChartGantt />
                    View
                  </DropdownMenuItem>
                </SheetTrigger>

                <SheetTrigger asChild>
                  <DropdownMenuItem onClick={() => setOpenSheet("edit")}>
                    <PencilIcon />
                    Edit
                  </DropdownMenuItem>
                </SheetTrigger>

                <DropdownMenuItem>
                  <ShareIcon />
                  Share
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">
                  <TrashIcon />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {openSheet === "view" && (
            <TaskSheet title="Task" description="Review your task.">
              <p>{task.description}</p>
            </TaskSheet>
          )}
          {openSheet === "edit" && (
            <TaskSheet
              title="Update task"
              description="Make changes to your task here. Click save when you're done."
            >
              <p>{task.description}</p>
            </TaskSheet>
          )}
        </Sheet>
      </ItemActions>
    </Item>
  );
}
