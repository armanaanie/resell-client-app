"use client";

import {
  Users,
  ShoppingCart,
  TrendingUp,
  Grid3X3,
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import CountUp from "react-countup";
import { motion } from "framer-motion";

/* ---------------- DATA ---------------- */

const stats = [
  { title: "Total Users", value: 4700, icon: Users, color: "blue" },
  { title: "Total Orders", value: 1050, icon: ShoppingCart, color: "purple" },
  { title: "Revenue Growth", value: 32, suffix: "%", icon: TrendingUp, color: "green" },
  { title: "Categories", value: 12, icon: Grid3X3, color: "pink" },
];

const userGrowth = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 800 },
  { name: "Mar", users: 1200 },
  { name: "Apr", users: 1800 },
  { name: "May", users: 2600 },
  { name: "Jun", users: 3400 },
];

const orders = [
  { name: "Jan", orders: 200 },
  { name: "Feb", orders: 300 },
  { name: "Mar", orders: 500 },
  { name: "Apr", orders: 700 },
  { name: "May", orders: 900 },
  { name: "Jun", orders: 1050 },
];

/* ---------------- ANIMATION ---------------- */

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

/* ---------------- PAGE ---------------- */

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-4 md:p-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold">
          Platform Analytics
        </h1>
        <p className="text-gray-400 mt-1">
          Real-time business insights & performance
        </p>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((item, i) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              animate="show"
              className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:scale-[1.03] transition"
            >
              <Icon className="w-6 h-6 mb-4 text-white/80" />

              <p className="text-gray-400 text-sm">{item.title}</p>

              <h2 className="text-2xl font-bold mt-1">
                <CountUp
                  end={item.value}
                  duration={2}
                  suffix={item.suffix || ""}
                />
              </h2>
            </motion.div>
          );
        })}
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* USER GROWTH */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl"
        >
          <h3 className="text-lg font-semibold mb-4">
            User Growth
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ORDERS */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl"
        >
          <h3 className="text-lg font-semibold mb-4">
            Monthly Orders
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orders}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="orders" fill="#a855f7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}