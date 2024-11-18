import z from "zod";

const subscriptionSchema = z.object({
  userId: z.number(),
  endpoint: z.string().url(),
  p256dh: z.string(),
  auth: z.string(),
});

export function validateSubscription(input) {
  return subscriptionSchema.safeParse(input);
}
