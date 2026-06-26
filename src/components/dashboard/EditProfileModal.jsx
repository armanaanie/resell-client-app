"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal } from "@heroui/react";
import { toast } from "react-toastify";

import { updateUser } from "@/lib/api/users";
import { uploadImageToImgBB } from "@/lib/uploadImageToImgbb";
import { getTokenForClient } from "@/lib/useTokenClient";

export default function EditProfileModal({ user }) {
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
        image: imageUrl,
        phone: formData.get("phone"),
        address: formData.get("address"),
      };
const token= await getTokenForClient()
      const res = await updateUser(token,
        user._id,
        payload
      );

      if (
        res.modifiedCount > 0 ||
        res.matchedCount > 0
      ) {
        toast.success(
          "Profile updated successfully"
        );

        router.refresh();
      } else {
        toast.error(
          "Failed to update profile"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <Modal placement="center">
      <Button color="danger">
        Edit Profile
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="bg-[#760031] border border-white/10 text-white">

            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>
                Edit Profile
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <form
                id="edit-profile-form"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block mb-2 text-sm">
                    Profile Image
                  </label>

                  <input
                    type="file"
                    name="image"
                    className="w-full rounded-xl border border-white/20 bg-white/10 p-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    defaultValue={
                      user?.phone || ""
                    }
                    className="w-full rounded-xl border border-white/20 bg-white/10 p-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">
                    Address
                  </label>

                  <textarea
                    name="address"
                    rows={4}
                    defaultValue={
                      user?.address || ""
                    }
                    className="w-full rounded-xl border border-white/20 bg-white/10 p-3 outline-none"
                  />
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button
                color="danger"
                type="submit"
                form="edit-profile-form"
                isLoading={loading}
              >
                Save Changes
              </Button>
            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}