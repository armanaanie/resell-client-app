"use client";

import Link from "next/link";
import { RefreshCw, Menu, X } from "lucide-react";
import SignOutButton from "./SignOutButton";
import { Handset } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";


export default  function ReSellNavbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
console.log(user)
const role = user?.role;
console.log(role)
  const NavLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/Products" },
    { label: "Categories", href: "/categories" },
    { label: "About Us", href: "/about" }
,
...(
  role
    ? [{ label: "Dashboard", href: `/dashboard/${role}` }]
    : []
),
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#A5CF83] flex items-center justify-center">
          <RefreshCw size={16} className="text-[#1A3A0A]" />
        </div>

        <span
          className="text-lg font-bold hidden sm:block"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          ReSell Hub
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-4 items-center">
        {NavLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>

      {/* AUTH */}
     
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            <SignOutButton />
          </>
        ) : (
          <Link href="/auth/signin">Sign In</Link>
        )}
        <Link href="/contact"><Handset/></Link>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <input id="menu-toggle" type="checkbox" className="peer hidden" />

        <label htmlFor="menu-toggle">
          <Menu />
          
        </label>

        <div className="fixed inset-0 z-50 bg-[#760031] hidden peer-checked:flex flex-col  text-white">

          {/* Header */}
          <div className="flex justify-between p-4 border-b">
            <span>Menu</span>
            <label htmlFor="menu-toggle">
              <X />
            </label>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 p-6">
            {NavLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
<Link href="/contact"><Handset/></Link>
            {user ? (
              <SignOutButton />
            ) : (
              <Link href="/auth/signin">Sign In</Link>
            )}
          </div>

        </div>
      </div>

    </nav>
  );
}