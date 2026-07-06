import { z } from "zod";

export const serviceOptions = [
  "Inbox & Email Management",
  "Calendar & Travel Coordination",
  "Operations & Documentation",
  "Social Media & Community",
  "Research & General Support",
  "Multiple Services",
] as const;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  service: z.enum(serviceOptions, {
    error: "Please select a service",
  }),
  message: z.string().min(20, "Please share a bit more detail (at least 20 characters)"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
