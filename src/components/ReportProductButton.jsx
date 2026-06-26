"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { reportProduct } from "@/lib/actions/reports";


export default function ReportProductButton({
  product,
}) {
  const { data: session } =
    authClient.useSession();

  const [isOpen, setIsOpen] =
    useState(false);

  const [reason, setReason] =
    useState("");

  const handleReport = async () => {
    if (!reason) {
      alert("Please select a reason");
      return;
    }

    const reportData = {
      productId: product._id,
      productTitle: product.title,

      sellerName:
        product.sellerName,

      reporterId:
        session?.user?.id,

      reporterName:
        session?.user?.name,

      reporterEmail:
        session?.user?.email,

      reason,
    };

    const data =
      await reportProduct(
        reportData
      );

    if (data.success) {
      setIsOpen(false);
      setReason("");

      alert(
        "Report submitted successfully"
      );
    } else {
      alert(
        data.message ||
          "Failed to submit report"
      );
    }
  };

  return (
    <>
      <Button
        color="danger"
        variant="flat"
        onPress={() =>
          setIsOpen(true)
        }
      >
        Report Product
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <Modal.Backdrop />

        <Modal.Container>
          <Modal.Dialog className="bg-slate-900 border border-white/10 text-white rounded-3xl">

            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>
                Report Product
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <p className="text-white/70">
                Why are you reporting
                this product?
              </p>

              <select
                value={reason}
                onChange={(e) =>
                  setReason(
                    e.target.value
                  )
                }
                className="w-full mt-3 p-3 rounded-xl bg-white/10 border border-white/10"
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
                onPress={
                  handleReport
                }
              >
                Submit Report
              </Button>
            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal>
    </>
  );
}