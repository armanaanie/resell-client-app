export default function SellerAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#760031] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1
            className="text-4xl font-bold"
            style={{
              fontFamily: "'DM Serif Display', serif",
            }}
          >
            Analytics Dashboard
          </h1>

          <p className="text-white/60 mt-2">
            Monitor your sales performance and marketplace growth.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <p className="text-white/60">
              Total Revenue
            </p>

            <h2 className="text-4xl font-bold text-[#FEEC41] mt-3">
              ৳245K
            </h2>

            <p className="text-green-400 mt-2">
              +12.5% this month
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <p className="text-white/60">
              Orders Received
            </p>

            <h2 className="text-4xl font-bold text-[#FEEC41] mt-3">
              324
            </h2>

            <p className="text-green-400 mt-2">
              +8.2% this month
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <p className="text-white/60">
              Products Sold
            </p>

            <h2 className="text-4xl font-bold text-[#FEEC41] mt-3">
              182
            </h2>

            <p className="text-green-400 mt-2">
              +15.4% this month
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <p className="text-white/60">
              Conversion Rate
            </p>

            <h2 className="text-4xl font-bold text-[#FEEC41] mt-3">
              78%
            </h2>

            <p className="text-green-400 mt-2">
              Excellent Performance
            </p>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Revenue Chart */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <h2 className="text-xl font-semibold mb-6">
              Revenue Overview
            </h2>

            <div className="h-72 flex items-end gap-4">
              {[40, 55, 35, 80, 60, 90, 75].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-gradient-to-t from-[#D51C39] to-[#FEEC41] rounded-t-2xl"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                )
              )}
            </div>

            <div className="flex justify-between text-white/50 text-sm mt-4">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </div>

          {/* Top Products */}
          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <h2 className="text-xl font-semibold mb-6">
              Top Products
            </h2>

            <div className="space-y-5">

              {[
                "iPhone 13",
                "MacBook Pro",
                "Gaming PC",
                "Samsung S24",
              ].map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <span>{product}</span>

                  <span className="text-[#FEEC41] font-semibold">
                    #{index + 1}
                  </span>
                </div>
              ))}

            </div>
          </div>

        </div>

        {/* Bottom Cards */}
        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <h2 className="text-xl font-semibold mb-6">
              Customer Insights
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>New Buyers</span>
                <span className="text-[#FEEC41]">
                  125
                </span>
              </div>

              <div className="flex justify-between">
                <span>Returning Buyers</span>
                <span className="text-[#FEEC41]">
                  89
                </span>
              </div>

              <div className="flex justify-between">
                <span>Satisfaction Rate</span>
                <span className="text-[#FEEC41]">
                  96%
                </span>
              </div>

            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <h2 className="text-xl font-semibold mb-6">
              Sales Target
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Current</span>
                <span>৳245,000</span>
              </div>

              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-gradient-to-r from-[#D51C39] to-[#FEEC41]" />
              </div>

              <div className="flex justify-between text-sm text-white/60">
                <span>78% Completed</span>
                <span>Goal: ৳315,000</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}