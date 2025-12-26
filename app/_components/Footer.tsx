import { House, ListOrdered, Store, User } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed top-10 left-6 z-50">
      <div
        className="
      flex flex-col
      justify-between
      px-6 py-6
      gap-6
      h-[calc(100vh-5rem)]
      bg-black
      border border-gray-800
      rounded-2xl
      shadow-xl
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
