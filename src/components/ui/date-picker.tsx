import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "src/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerDemoProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

export function DatePicker({
  selectedDate,
  onSelectDate,
}: DatePickerDemoProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
