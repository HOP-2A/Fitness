import { House, ListOrdered, Store, User } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
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
          bg-black
          border-r border-gray-800
          rounded-none
        "
      >
        <Link
          href="/"
          className="flex items-center gap-4 text-white hover:text-gray-400 transition"
        >
          <House size={22} />
          <span className="text-sm font-medium">Home</span>
        </Link>

        <Link
          href="/leader"
          className="flex items-center gap-4 text-white hover:text-gray-400 transition"
        >
          <ListOrdered size={22} />
          <span className="text-sm font-medium">Leaderboard</span>
        </Link>

        <Link
          href="/user"
          className="flex items-center gap-4 text-white hover:text-gray-400 transition"
        >
          <User size={22} />
          <span className="text-sm font-medium">Profile</span>
        </Link>

        <Link
          href="/shop"
          className="flex items-center gap-4 text-white hover:text-gray-400 transition"
        >
          <Store size={22} />
          <span className="text-sm font-medium">Shop</span>
        </Link>
      </div>
    </div>
  );
};
