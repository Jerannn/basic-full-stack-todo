import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RowsPerPageSelectProps = {
  value: number;
  onChange: (limit: string) => void;
};

export default function RowsPerPageSelect({
  value,
  onChange,
}: RowsPerPageSelectProps) {
  return (
    <Field orientation="horizontal" className="w-fit">
      <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
      <Select
        defaultValue="2"
        value={String(value)}
        onValueChange={(val) => onChange(val)}
      >
        <SelectTrigger className="w-20" id="select-rows-per-page">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start">
          <SelectGroup>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
