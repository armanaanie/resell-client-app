import { getPayments } from "@/lib/actions/payment";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PaymentsPage() {
  const session = await auth.api.getSession({
  headers: await headers(),
});
  const buyerId = session.user.id;
const payments = await getPayments(buyerId);
  
console.log(payments)

  const statusColor = (status) => {
  switch (status) {
    case "pending":
      return "text-yellow-300 border-yellow-300/30";
    case "shipped":
      return "text-blue-300 border-blue-300/30";
    case "delivered":
      return "text-green-300 border-green-300/30";
    default:
      return "text-white border-white/20";
  }
};

  return (<div className="min-h-screen p-8 bg-[#760031]">

      <h1 className="text-2xl font-bold text-white mb-6">
        My Payments 💳
      </h1>
<div className="grid md:grid-cols-2 gap-6">
  {payments.map((p) => (
    <div
      key={p._id}
      className="
        relative p-6 rounded-2xl
        backdrop-blur-xl bg-white/5
        border border-white/10
        shadow-xl
        hover:scale-[1.02]
        transition-all duration-300
      "
    >
      <div className="space-y-3 text-white">

        <h2 className="font-bold text-lg text-[#FEEC41]">
          Payment Transaction
        </h2>

        <div>
          <p className="text-white/50 text-sm">
            Transaction ID
          </p>

          <p className="text-sm break-all">
            {p.transactionId}
          </p>
        </div>

        <div>
          <p className="text-white/50 text-sm">
            Amount
          </p>

          <p className="font-semibold text-xl">
            ৳{(p.amount / 100).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-white/50 text-sm">
            Payment Method
          </p>

          <p>
            {p.paymentMethod}
          </p>
        </div>

        <div className="flex gap-2">
          <span
            className="
              px-3 py-1 text-xs rounded-full
              border border-green-300/30
              text-green-300
            "
          >
            {p.paymentStatus}
          </span>
        </div>

        <p className="text-xs text-white/40 pt-2">
          Payment Date:
          {" "}
          {new Date(
            p.paymentDate
          ).toLocaleString()}
        </p>

      </div>
    </div>
  ))}
</div>
    </div>)
}