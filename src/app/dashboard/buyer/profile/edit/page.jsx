import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import EditProfileForm from "@/components/EditProfileForm";

export default async function EditProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen bg-[#760031] p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <EditProfileForm user={session?.user} />
      </div>
    </div>
  );
}