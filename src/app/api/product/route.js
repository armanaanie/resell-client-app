import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ❌ Not logged in
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ❌ Not seller
  if (session.user.role !== "seller") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  // Save product to DB here
  // await db.product.insert({...})

  return NextResponse.json({
    success: true,
    message: "Product created",
  });
}