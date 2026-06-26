"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignout = async () => {
    await authClient.signOut();
    router.push("/auth/signin");
  };

  return (
    <button
      onClick={handleSignout}
      className="text-white font-medium"
    >
      Sign Out
    </button>
  );
}