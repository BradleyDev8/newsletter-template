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
    console.log("Received email:", email);

    // Check if the email already exists in the database
    const { count, error: selectError } = await supabase
      .from("newsletters")
      .select("email", { count: "exact", head: true })
      .eq("email", email);

    console.log("Email count:", count);
    console.log("Select error:", selectError);

    if (selectError) {
      console.error("Error checking email existence:", selectError);
      return NextResponse.json(
        { error: "An error occurred while checking email existence." },
        { status: 500 }
      );
    }

    if (count && count > 0) {
      return NextResponse.json({ error: "Email already exists." }, { status: 400 });
    }

    // Insert the email into the database
    const { data, error } = await supabase.from("newsletters").insert({ email });

    console.log("Inserted data:", data);
    console.log("Insert error:", error);

    if (error) {
      console.error("Error inserting email:", error);
      return NextResponse.json(
        { error: "An error occurred while subscribing to the newsletter." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Successfully subscribed to the newsletter" });
  } catch (err) {
    console.error("Caught error:", err);
    return NextResponse.error();
  }
}
