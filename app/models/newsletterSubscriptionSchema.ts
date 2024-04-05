import * as z from "zod";

export const NewsletterSubscriptionParamsSchema = z.object({
  email: z.string().email(),
});

export type NewsletterSubscriptionParams = z.infer<typeof NewsletterSubscriptionParamsSchema>;
