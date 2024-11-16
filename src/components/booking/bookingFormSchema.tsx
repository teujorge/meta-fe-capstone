import { z } from "zod";

export const bookingFormSchema = z
  .object({
    date: z
      .date({
        required_error: "Date is required",
        invalid_type_error: "Invalid date format",
      })
      .refine(
        (date) => {
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          const selectedDate = new Date(date);
          selectedDate.setHours(0, 0, 0, 0);
          return selectedDate >= now;
        },
        { message: "Date must be today or in the future" }
      ),
    time: z.string().min(1, "Time is required"),
    contactMethod: z.enum(["SMS", "Email"], {
      errorMap: () => ({ message: "Please select a contact method" }),
    }),
    contactInfo: z.string().min(1, "Contact information is required"),
    numberOfPeople: z
      .number()
      .min(1, "At least one person is required")
      .max(20, "Maximum of 20 people allowed"),
    occasion: z.enum(["Birthday", "Anniversary", "Date", "Business", "Other"], {
      errorMap: () => ({ message: "Please select an occasion" }),
    }),
    specialRequests: z
      .string()
      .max(500, "Special requests can't exceed 500 characters")
      .optional(),
  })
  .refine(
    (data) =>
      data.contactMethod === "SMS"
        ? /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(data.contactInfo)
        : true,
    {
      message: "Invalid phone number",
      path: ["contactInfo"],
    }
  )
  .refine(
    (data) =>
      data.contactMethod === "Email"
        ? /\S+@\S+\.\S+/.test(data.contactInfo)
        : true,
    {
      message: "Invalid email address",
      path: ["contactInfo"],
    }
  );
