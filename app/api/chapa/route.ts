// app/api/chapa/callback/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const tx_ref = body.tx_ref;

    // ✅ Verify the transaction
    const verifyRes = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      },
    });

    const result = await verifyRes.json();

    if (result.status === "success" && result.data.status === "success") {
      // ✅ Update database or payment logs
      console.log("✅ Payment confirmed:", result.data);

      // You can now:
      // - Save to Firebase or Mongo
      // - Send email
      // - Notify dashboard

      return NextResponse.json({ received: true });
    } else {
      console.error("❌ Payment not verified:", result);
      return NextResponse.json({ error: "Payment not verified" }, { status: 400 });
    }
  } catch (error) {
    console.error("❌ Callback crash:", error);
    return NextResponse.json({ error: "Callback crashed" }, { status: 500 });
  }
}
