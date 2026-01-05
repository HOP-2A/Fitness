"use client";

import { House, ListOrdered, Store, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname(); // gets current route

  const links = [
    { href: "/", label: "Home", icon: <House size={22} /> },
    { href: "/leader", label: "Leaderboard", icon: <ListOrdered size={22} /> },
    { href: "/user", label: "Profile", icon: <User size={22} /> },
    { href: "/shop", label: "Shop", icon: <Store size={22} /> },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen z-50">
      <div
        className="
        flex flex-col
        items-start
        pt-8
        pb-20
        px-6
        gap-16
        h-full
        w-56
        bg-gradient-to-b from-[#111827] to-[#1F2937]
        border-r border-gray-700
        text-gray-200
        shadow-lg
      "
      >
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-4 transition
                ${
                  isActive
                    ? "text-blue-400 font-semibold"
                    : "text-white hover:text-gray-400"
                }
              `}
            >
              {link.icon}
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
