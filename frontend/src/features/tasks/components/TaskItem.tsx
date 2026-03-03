// hooks
import { useState } from "react";

// icons
import {
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
  ItemDescription,
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

type Props = {
  task: any;
};

export default function TaskItem({ task }: Props) {
  const [openSheet, setOpenSheet] = useState("");
  return (
    <Item
      variant="outline"
      className="border-gray-100 border-l-0 border-r-0 border-b-0 rounded-none py-1"
    >
      <ItemActions>
        <Checkbox />
      </ItemActions>

      <ItemContent>
        <ItemTitle>{task.title}</ItemTitle>
        <ItemDescription>{task.description}</ItemDescription>
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
