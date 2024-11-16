import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";
import { bookingFormSchema } from "./bookingFormSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type BookingFormData = z.infer<typeof bookingFormSchema>;

export function BookingForm() {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      dateTime: new Date(new Date().setHours(16, 0, 0, 0)).toISOString(), // Sets default to 4 PM
      contactMethod: "Email",
      contactInfo: "",
      numberOfPeople: 1,
      specialRequests: "",
    },
  });

  const { watch, handleSubmit, control } = form;
  const contactMethod = watch("contactMethod");

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
                          const currentDateTime = field.value
                            ? new Date(field.value)
                            : new Date();
                          const newDate = new Date(date);

                          // Preserve the existing time
                          newDate.setHours(
                            currentDateTime.getHours(),
                            currentDateTime.getMinutes(),
                            currentDateTime.getSeconds(),
                            currentDateTime.getMilliseconds()
                          );

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
                      <Slider
                        className="w-full"
                        defaultValue={[16]} // Default to 4 PM
                        min={0}
                        max={23}
                        step={1}
                        onValueChange={(val) => {
                          const newHour = val[0];
                          const currentDate = field.value
                            ? new Date(field.value)
                            : new Date();

                          // Preserve the current date and update the hour
                          currentDate.setHours(newHour, 0, 0, 0);

                          // Update the form field with the new ISO string
                          field.onChange(currentDate.toISOString());
                        }}
                        value={[
                          field.value ? new Date(field.value).getHours() : 16,
                        ]} // Reflect current hour
                      />
                    </FormControl>

                    <span className="sm:mt-2 text-sm text-muted-foreground min-w-12">
                      {(() => {
                        const hours = new Date(field.value).getHours();
                        return hours > 12 ? `${hours - 12} PM` : `${hours} AM`;
                      })()}
                    </span>
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

          {/* Number of People */}
          <FormField
            control={form.control}
            name="numberOfPeople"
            render={({ field }) => (
              <FormItem>
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
