import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Integrate with Resend, Mailgun, or another email service
    // Example with Resend:
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "noreply@blackelephant.com.br",
    //   to: "guilherme@blackelephant.com.br",
    //   subject: `Novo orçamento: ${body.projectTypes?.join(", ")}`,
    //   html: `<pre>${JSON.stringify(body, null, 2)}</pre>`,
    // });

    console.log("[quote] New quote request:", JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[quote] Error processing request:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
