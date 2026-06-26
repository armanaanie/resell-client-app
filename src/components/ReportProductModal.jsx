"use client";

import { Button, Modal } from "@heroui/react";
import { useState } from "react";

export default function ReportProductModal({
  isOpen,
  setIsOpen,
  onSubmit,
}) {
  const [reason, setReason] =
    useState("");

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      disableAnimation
    >
      <Modal.Backdrop >

      <Modal.Container>
        <Modal.Dialog className="bg-slate-900 text-white border border-white/10 rounded-3xl">

          <Modal.CloseTrigger />

          <Modal.Header>
            <Modal.Heading>
              Report Product
            </Modal.Heading>
          </Modal.Header>

          <Modal.Body>
            <select
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              className="w-full p-3 rounded-xl bg-white/10"
            >
              <option value="">
                Select Reason
              </option>

              <option value="Fake Product">
                Fake Product
              </option>

              <option value="Scam">
                Scam
              </option>

              <option value="Wrong Information">
                Wrong Information
              </option>

              <option value="Offensive Content">
                Offensive Content
              </option>
            </select>
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
              onPress={() =>
                onSubmit(reason)
              }
            >
              Submit Report
            </Button>
          </Modal.Footer>

        </Modal.Dialog>
      </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}