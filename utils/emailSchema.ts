import { z } from "zod";

const emailSchema = z
  .string()
  .refine(
    (email) => email.endsWith("@gmail.com") || email.endsWith("@outlook.com"),
    "Only Gmail and Outlook emails are allowed."
  );

export default emailSchema;
