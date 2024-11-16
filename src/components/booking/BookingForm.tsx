import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { submitAPI } from "src/api";
import { z } from "zod";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import { bookingFormSchema } from "./bookingFormSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type BookingFormData = z.infer<typeof bookingFormSchema>;

export function BookingForm({
  availableTimes,
  onDateChange,
}: {
  availableTimes: string[];
  onDateChange: (date: Date) => Promise<void>;
}) {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      date: new Date(),
      time: undefined,
      contactMethod: "Email",
      contactInfo: undefined,
      numberOfPeople: 2,
      occasion: "Other",
      specialRequests: undefined,
    },
  });

  const { watch, handleSubmit, control } = form;
  const contactMethod = watch("contactMethod");

  useEffect(() => {
    const currentTime = form.getValues("time");

    if (!currentTime) {
      form.setValue("time", availableTimes[0]);
      return;
    }

    // Find the closest available time to the previously selected time
    const closestTime = availableTimes.reduce((closest, slot) => {
      const currentTimeMinutes = parseTimeToMinutes(currentTime);
      const slotMinutes = parseTimeToMinutes(slot);

      const closestMinutes = parseTimeToMinutes(closest);
      const currentDifference = Math.abs(slotMinutes - currentTimeMinutes);
      const closestDifference = Math.abs(closestMinutes - currentTimeMinutes);

      return currentDifference < closestDifference ? slot : closest;
    }, availableTimes[0]);

    form.setValue("time", closestTime);
  }, [form, availableTimes]);

  function parseTimeToMinutes(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  const onSubmit = async (data: BookingFormData) => {
    console.log("Form Submitted:", data);
    try {
      const success = await submitAPI(data);
      if (success) {
        alert("Booking successfully submitted!");
      } else {
        alert("Failed to submit booking. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-screen-sm mx-auto">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Date and Time */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Day */}
            <div className="flex flex-row gap-2 w-full sm:w-2/3">
              <FormField
                control={control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date and Time</FormLabel>
                    <FormControl>
                      <DatePicker
                        selectedDate={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelectDate={(date) => {
                          if (date) {
                            onDateChange(date);
                            field.onChange(date);
                          } else {
                            field.onChange(undefined);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Time */}
            <div className="flex flex-row gap-2 w-full sm:w-1/3">
              <FormField
                control={control}
                name="time"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="invisible">Select Time</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger aria-label="Select Time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimes.map((option) => (
                            <SelectItem
                              key={`time-slot-${option}`}
                              value={option}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Contact Method */}
          <FormField
            control={form.control}
            name="contactMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex items-center"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <RadioGroupItem value="SMS" id="sms" />
                    <label htmlFor="sms" className="cursor-pointer pl-2 pr-8">
                      SMS
                    </label>

                    <RadioGroupItem value="Email" id="email" />
                    <label htmlFor="email" className="cursor-pointer pl-2">
                      Email
                    </label>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Information (Conditional) */}
          {contactMethod === "SMS" && (
            <FormField
              control={form.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="e.g., +1234567890"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {contactMethod === "Email" && (
            <FormField
              control={form.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex flex-row gap-2 w-full">
            {/* Number of People */}
            <FormField
              control={form.control}
              name="numberOfPeople"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Number of People</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Occasion */}
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Occasion</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Birthday">Birthday</SelectItem>
                        <SelectItem value="Anniversary">Anniversary</SelectItem>
                        <SelectItem value="Date">Date</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Special Requests */}
          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requests</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter any special requests here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="!pointer-events-auto">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
