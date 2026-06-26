"use client";
import { useRouter } from "next/navigation";

import { Button, Modal } from "@heroui/react";
import { changeStatus, deleteUser } from "@/lib/actions/users";
import { useState } from "react";
import DeleteUserModal from "../DeleteUserModal";
import { getTokenForClient } from "@/lib/useTokenClient";


export default  function AdminUsersTable({
  users,
})



{  
    const [isOpen, setIsOpen] =
  useState(false);

const [selectedUser, setSelectedUser] =
  useState(null);
    
    const router = useRouter();

const handleStatus = async (
  id,
  currentStatus
) => {
  try {
    const newStatus =
      currentStatus === "active"
        ? "blocked"
        : "active";
const token= await getTokenForClient();
    const data = await changeStatus(
      id,
      newStatus,token
    );

    if (data.modifiedCount) {
      router.refresh();
    }
  } catch (error) {
    console.error(error);
  }
};
const confirmDelete = async () => {
  try {
    const token= await getTokenForClient()
    const data = await deleteUser(
       selectedUser._id,token
    );

    if (data.deletedCount) {
      setIsOpen(false);
      setSelectedUser(null);
      router.refresh();
    }
  } catch (error) {
    console.log(error);
  }
};
    
  return (
    <div
      className="
        overflow-x-auto
        bg-white/5
        border
        border-white/10
        rounded-3xl
        backdrop-blur-xl
      "
    >
      <table className="w-full text-white">

        <thead>
          <tr className="border-b border-white/10">
            <th className="p-4 text-left">
              User
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Role
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (
            <tr
              key={user._id}
              className="
                border-b
                border-white/5
                hover:bg-white/5
              "
            >
              <td className="p-4">
                <div>
                  <h3 className="font-semibold">
                    {user.name}
                  </h3>
                </div>
              </td>

              <td className="p-4 text-white/70">
                {user.email}
              </td>

              <td className="p-4">
                <span
                  className={`
                    px-3 py-1 rounded-full text-xs
                    ${
                      user.role === "admin"
                        ? "bg-red-500/20 text-red-300"
                        : user.role === "seller"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-green-500/20 text-green-300"
                    }
                  `}
                >
                  {user.role}
                </span>
              </td>

              <td className="p-4">
                <span
  className={`px-3 py-1 rounded-full text-xs ${
    user.status === "blocked"
      ? "bg-red-500/20 text-red-300"
      : "bg-green-500/20 text-green-300"
  }`}
>
  {user.status || "active"}
</span>
              </td>

              <td className="p-4">
                <div className="flex gap-2">

                  <button
  onClick={() =>
    handleStatus(
      user._id,
      user.status || "active"
    )
  }
  className={`px-3 py-1 rounded-lg ${
    user.status === "blocked"
      ? "bg-green-500/20 text-green-300"
      : "bg-yellow-500/20 text-yellow-300"
  }`}
>
  {user.status === "blocked"
    ? "Unblock"
    : "Block"}
</button>
                 
  <Button
  size="sm"
  color="danger"
  variant="flat"
  onPress={() => {
    setSelectedUser(user);
    setIsOpen(true);
  }}
>
  Delete
</Button>

                </div>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      <Modal
      isOpen={isOpen}
      onOpenChange={(open) =>
        setIsOpen(open)
      }
       disableAnimation
    >

<Modal.Backdrop>
      <Modal.Container>
        <Modal.Dialog className="bg-slate-900 border border-white/10 text-white rounded-3xl">
          <Modal.CloseTrigger />

          <Modal.Header>
            <Modal.Heading>
              Delete User
            </Modal.Heading>
          </Modal.Header>

          <Modal.Body>
            <p className="text-white/70">
              Are you sure you want to
              permanently delete
              <span className="font-semibold text-red-400 ml-1">
                {selectedUser?.name}
              </span>
              ?
            </p>

            <p className="text-sm text-red-400 mt-2">
              This action cannot be undone.
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="flat"
              onPress={() =>
                setIsOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              color="danger"
              onPress={confirmDelete}
              
            >
              Delete User
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
      </Modal.Backdrop>
    </Modal>
    </div>
  );
}