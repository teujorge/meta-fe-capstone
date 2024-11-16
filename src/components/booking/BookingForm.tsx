import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import { bookingFormSchema } from "./bookingFormSchema";
import { findNearestTime, type TimeSlot } from "./availableTimesReducer";
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
  dispatch,
}: {
  availableTimes: TimeSlot[];
  dispatch: React.Dispatch<{ type: "UPDATE_TIMES"; payload: Date }>;
}) {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      dateTime: new Date(new Date().setHours(18, 0, 0, 0)).toISOString(),
      contactMethod: "Email",
      contactInfo: "",
      numberOfPeople: 2,
      occasion: "Other",
      specialRequests: "",
    },
  });

  const { watch, handleSubmit, control } = form;
  const contactMethod = watch("contactMethod");

  useEffect(() => {
    // When availableTimes update, adjust the time if necessary
    const currentDateTime = new Date(form.getValues("dateTime"));
    const currentHour = currentDateTime.getHours();

    const isCurrentHourAvailable = availableTimes.some(
      (slot) => parseInt(slot.value, 10) === currentHour
    );

    if (!isCurrentHourAvailable) {
      const newHour = parseInt(
        findNearestTime(currentHour, availableTimes),
        10
      );
      currentDateTime.setHours(newHour, 0, 0, 0);
      form.setValue("dateTime", currentDateTime.toISOString());
    }
  }, [form, availableTimes]);

  const onSubmit = (values: BookingFormData) => {
    console.log("Form Submitted:", values);
    // TODO: Submit form data to the server
  };

  return (
    <div className="w-full max-w-screen-sm mx-auto">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Date and Time */}
          <FormField
            control={control}
            name="dateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date and Time</FormLabel>
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Day */}
                  <FormControl>
                    <DatePicker
                      selectedDate={
                        field.value ? new Date(field.value) : undefined
                      }
                      onSelectDate={(date) => {
                        if (date) {
                          dispatch({ type: "UPDATE_TIMES", payload: date });

                          const currentDateTime = field.value
                            ? new Date(field.value)
                            : new Date();
                          const currentHour = currentDateTime.getHours();

                          // Use the updated availableTimes from props after dispatch
                          const isCurrentHourAvailable = availableTimes.some(
                            (slot) => parseInt(slot.value, 10) === currentHour
                          );

                          const newHour = isCurrentHourAvailable
                            ? currentHour
                            : parseInt(
                                findNearestTime(currentHour, availableTimes),
                                10
                              );

                          // Set the new date and time
                          const newDate = new Date(date);
                          newDate.setHours(newHour, 0, 0, 0);

                          field.onChange(newDate.toISOString());
                        } else {
                          field.onChange(undefined);
                        }
                      }}
                    />
                  </FormControl>

                  {/* Time */}
                  <div className="flex flex-row gap-2 w-full sm:w-1/3">
                    <FormControl>
                      <Select
                        value={
                          field.value
                            ? new Date(field.value).getHours().toString()
                            : "18"
                        }
                        onValueChange={(value) => {
                          const newHour = parseInt(value, 10);
                          const currentDate = field.value
                            ? new Date(field.value)
                            : new Date();

                          // Preserve the current date and update the hour
                          currentDate.setHours(newHour, 0, 0, 0);

                          // Update the form field with the new ISO string
                          field.onChange(currentDate.toISOString());
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimes.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <FormLabel>SMS Number</FormLabel>
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
