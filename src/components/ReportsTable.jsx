"use client";

import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReportsTable({
  reports,
}) {
  const router = useRouter();

  if (!reports?.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center">
        <h3 className="text-xl text-white">
          No Reports Found
        </h3>

        <p className="text-white/60 mt-2">
          Everything looks clean.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-5 text-left">
                Product
              </th>

              <th className="p-5 text-left">
                Reporter
              </th>

              <th className="p-5 text-left">
                Reason
              </th>

              <th className="p-5 text-left">
                Status
              </th>

              <th className="p-5 text-left">
                Date
              </th>

              <th className="p-5 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="p-5">
                  <div>
                    <h3 className="font-semibold">
                      {report.productTitle}
                    </h3>

                    <p className="text-xs text-white/50">
                      {report.sellerName}
                    </p>
                  </div>
                </td>

                <td className="p-5">
                  <div>
                    <p>
                      {report.reporterName}
                    </p>

                    <p className="text-xs text-white/50">
                      {report.reporterEmail}
                    </p>
                  </div>
                </td>

                <td className="p-5">
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs">
                    {report.reason}
                  </span>
                </td>

                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      report.status ===
                      "resolved"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {report.status ||
                      "pending"}
                  </span>
                </td>

                <td className="p-5 text-white/60">
                  {new Date(
                    report.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-5">
                  <button
                    onClick={() =>
                      router.push(
                        `/Products/${report.productId}`
                      )
                    }
                    className="p-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}