// hooks
import { Controller, useForm } from "react-hook-form";

// shadcn ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { CreateTaskInput } from "../types";
import useCreateTask from "../hooks/useCreateTask";

export default function AddTask() {
  const { mutateAsync, isCreating } = useCreateTask();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskInput>();

  const onSubmit = async (data: CreateTaskInput) => {
    console.log(data);
    const result = await mutateAsync(data);
    if (result.status === "success") {
      reset();
    }
  };

  return (
    <>
      <form className="px-4" id="task-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="title">Task title</FieldLabel>
              <Input
                {...register("title", {
                  required: "Please provide a title for this task",
                })}
                id="title"
                name="title"
                placeholder="e.g. Finish monthly report"
              />

              {errors.title ? (
                <FieldError>{errors.title.message}</FieldError>
              ) : (
                <FieldDescription>
                  Provide a short, clear title for this task.
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Details</FieldLabel>
              <Textarea
                {...register("description")}
                id="description"
                name="description"
                placeholder="Add milk, eggs, and bread. Visit the supermarket after work..."
              />
              <FieldDescription>
                Add optional details, notes, or acceptance criteria.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="dueDate" className="max-w-18 w-full">
                Due date
              </FieldLabel>
              <Input
                {...register("dueDate")}
                type="datetime-local"
                id="dueDate"
                min={new Date().toISOString().split("T")[0]}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="description" className="max-w-18 w-full">
                Category
              </FieldLabel>

              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Work">Work</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <FieldError>{errors.category.message}</FieldError>
              )}
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>

      <SheetFooter className="flex flex-row-reverse gap-2">
        <Button type="submit" form="task-form" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create"}
        </Button>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </>
  );
}
