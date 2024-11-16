import { z } from "zod";

export const bookingFormSchema = z
  .object({
    dateTime: z.string().min(1, "Date and Time is required"),
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
