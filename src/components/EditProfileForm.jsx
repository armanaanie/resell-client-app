"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";

import { uploadImageToImgBB } from "@/lib/uploadImageToImgbb";

import { updateProfile } from "@/lib/actions/updateProfile";
import { getTokenForClient } from "@/lib/useTokenClient";

export default function EditProfileForm({ user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const file = formData.get("image");

      let imageUrl = user?.image || "";

      if (file && file.size > 0) {
        imageUrl = await uploadImageToImgBB(file);
      }

      const payload = {
        name: formData.get("name"),
        image: imageUrl,
        phone: formData.get("phone"),
        address: formData.get("address"),
      };
const token =await getTokenForClient()
      const res = await updateProfile(payload,token);

      if (res.modifiedCount > 0 || res.matchedCount > 0) {
        toast.success("Profile updated successfully");
        router.refresh();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Edit Profile
        </h1>

        <p className="text-white/60 mt-2">
          Update your profile information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-white/70 mb-2">
            Profile Image
          </label>

          <input
            type="file"
            name="image"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white"
          />
        </div>

        <div>
          <label className="block text-white/70 mb-2">
            Full Name
          </label>

          <input
            name="name"
            defaultValue={user?.name}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
          />
        </div>

        <div>
          <label className="block text-white/70 mb-2">
            Email
          </label>

          <input
            value={user?.email}
            disabled
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white/50"
          />
        </div>

        <div>
          <label className="block text-white/70 mb-2">
            Phone
          </label>

          <input
            name="phone"
            defaultValue={user?.phone || ""}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
          />
        </div>

        <div>
          <label className="block text-white/70 mb-2">
            Address
          </label>

          <textarea
            name="address"
            rows={4}
            defaultValue={user?.address || ""}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
          />
        </div>

        <Button
          type="submit"
          isLoading={loading}
          className="bg-white/20 text-white hover:bg-white/30"
        >
          Save Changes
        </Button>

      </form>
    </div>
  );
}