

"use client";

import Link from "next/link";
import { Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { useState } from "react";

export default function DashboardSidebar({ user }) {
  const role = user?.role;
  const [open, setOpen] = useState(false);
 const adminMenu = [
  {
    name: "Dashboard",
    href: "/dashboard/admin",
    icon: "📊",
  },
  {
    name: "Manage Users",
    href: "/dashboard/admin/users",
    icon: "👥",
  },
  {
    name: "Manage Products",
    href: "/dashboard/admin/products",
    icon: "📦",
  },
  {
    name: "Manage Orders",
    href: "/dashboard/admin/orders",
    icon: "🛒",
  },
   {
    name: "Report Products",
    href: "/dashboard/admin/reports",
   icon: "🚨"
  },
  {
    name: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: "📈",
  },
];

 const buyerMenu = [
  {
    name: "Dashboard",
    href: "/dashboard/buyer",
    icon: "📊",
  },
  {
    name: "My Orders",
    href: "/dashboard/buyer/orders",
    icon: "🛒",
  },
  {
    name: "Wishlist",
    href: "/dashboard/buyer/wishlist",
    icon: "❤️",
  },
  {
    name: "Payments",
    href: "/dashboard/buyer/payment",
    icon: "💳",
  },
  {
    name: "Profile",
    href: "/dashboard/buyer/profile",
    icon: "👤",
  },
];

  const sellerMenu = [
  {
    name: "Dashboard",
    href: "/dashboard/seller",
    icon: "📊",
  },
  {
    name: "My Products",
    href: "/dashboard/seller/allProduct",
    icon: "📦",
  },
  {
    name: "Add Product",
    href: "/dashboard/seller/addProduct",
    icon: "➕",
  },
  {
    name: "Orders",
    href: "/dashboard/seller/orders",
    icon: "🛒",
  },
  {
    name: "Analytics",
    href: "/dashboard/seller/analytics",
    icon: "📈",
  },
  {
    name: "Profile",
    href: "/dashboard/seller/profile",
    icon: "👤",
  },
];

const menu =
  role === "admin"
    ? adminMenu
    : role === "seller"
    ? sellerMenu
    : buyerMenu;

  const NavContent = (
    <nav className="flex flex-col gap-2 mt-6 w-full">
      {menu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="
            flex items-center gap-3
            rounded-xl
            px-4 py-3
            transition-all
            hover:bg-[#D51C39]
            text-white
          "
          onClick={() => setOpen(false)}
        >
          <span>{item?.icon}</span>
<span>{item.name}</span>
         
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="min-h-screen  border-r border-white/10 hidden lg:flex flex-col justify-between bg-[#760031] p-2">
        <div>{NavContent}</div>

        
      </aside>

      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4">
        <Button
          className="bg-[#D51C39] text-white"
          onPress={() => setOpen(true)}
        >
          <Bars />
          Menu
        </Button>
      </div>

      {/* Drawer */}
      <Drawer isOpen={open} onOpenChange={setOpen} >
        <Drawer.Content placement="left"isDismissable>
          <Drawer.Dialog className="bg-[#760031] text-white">

            <Drawer.Heading className="text-white text-xl">
  {role === "admin"
    ? "Admin"
    : role === "seller"
    ? "Seller"
    : "Buyer"} Dashboard
</Drawer.Heading>

            <Drawer.Body>
              {NavContent}

              
              
            </Drawer.Body>

          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </>
  );
}