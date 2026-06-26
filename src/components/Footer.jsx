import Link from "next/link";
import { RefreshCw, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const socialLinks = [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
  ];

  return (
    <footer className="bg-[#760031] text-white pt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2 mb-4">
           <div className="w-8 h-8 rounded-lg bg-[#A5CF83] flex items-center justify-center">
              <RefreshCw size={16} />
            </div>
            <span
              className="text-lg font-bold"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              ReSell Hub
            </span>
          </div>

          <p className="text-white/70 text-sm leading-relaxed">
            A trusted local marketplace for buying and selling pre-loved goods.
            We connect verified sellers with real buyers safely and easily.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-4 text-[#FEEC41]">Quick Links</h3>

          <ul className="space-y-2 text-white/70">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4 text-[#FEEC41]">Contact</h3>

          <div className="space-y-3 text-white/70 text-sm">

            <div className="flex items-center gap-2">
              <Mail size={16} />
              support@resellhub.com
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              +880 1XXX-XXXXXX
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              Chattogram, Bangladesh
            </div>

          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="font-semibold mb-4 text-[#FEEC41]">Follow Us</h3>

          <ul className="space-y-2 text-white/70">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <Link href={s.href} className="hover:text-white transition">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 py-5 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} ReSell Hub. All rights reserved.
      </div>

    </footer>
  );
}