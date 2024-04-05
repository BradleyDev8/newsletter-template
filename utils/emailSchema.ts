import { z } from "zod";

const emailSchema = z
  .string()
  .refine(
    (email) =>
      email.endsWith("@gmail.com") ||
      email.endsWith("@outlook.com") ||
      email.endsWith("@hotmail.com") ||
      email.endsWith("@outlook.co.uk") ||
      email.endsWith("@gmail.co.uk") ||
      email.endsWith("@live.com") ||
      "Only Gmail and Outlook emails are allowed."
  );

export default emailSchema;
