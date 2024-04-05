import { NextResponse } from "next/server";
import {
  NewsletterSubscriptionParams,
  NewsletterSubscriptionParamsSchema,
} from "@/app/models/newsletterSubscriptionSchema";
import supabase from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const subscriptionParams: NewsletterSubscriptionParams = await request.json();
    const validatedParams = NewsletterSubscriptionParamsSchema.safeParse(subscriptionParams);

    if (!validatedParams.success) {
      return NextResponse.json(
        { error: "Bad Request", issues: validatedParams.error.issues },
        { status: 400 }
      );
    }

    const { email } = validatedParams.data;

    const { data, error } = await supabase.from("newsletters").insert({ email });

    if (error) {
      console.error("Error inserting email:", error);
      return NextResponse.json(
        { error: "An error occurred while subscribing to the newsletter." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Successfully subscribed to the newsletter" });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
