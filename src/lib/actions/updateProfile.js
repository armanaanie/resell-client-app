"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function updateProfile(payload,token) {
  const session = await auth.api.getSession({
    headers: await headers(),

  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile/${session.user.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    }
  );

  const text = await res.text();

  console.log("Status:", res.status);
  console.log("Response:", text);

  if (!res.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
}