"use client";

import { Button, Modal } from "@heroui/react";

export default function DeleteUserModal({
  isOpen,
  setIsOpen,
  selectedUser,
  onConfirm,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) =>
        setIsOpen(open)
      }
       disableAnimation
    >
<Button>Open Modal</Button>
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
              onPress={onConfirm}
            >
              Delete User
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}