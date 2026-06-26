"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const saveUser = async () => {
      const session = await authClient.getSession();

      if (!session?.data?.user) {
        router.push("/login");
        return;
      }

      const user = session.data.user;

      await fetch("http://localhost:5000/api/users/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          image: user.image,
          emailVerified: user.emailVerified,
        }),
      });

      router.push("/");
    };

    saveUser();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Signing you in...</h1>
    </div>
  );
}