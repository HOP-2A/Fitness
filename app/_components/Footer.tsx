import { House, ListOrdered, User } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed top-10 right-450 z-50 bottom-200">
      <div
        className="
          flex flex-col
          justify-between
          gap-6
          min-h-[220px]
          bg-black
          border border-gray-800
          rounded-2xl
          px-6 py-6
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
      </div>
    </div>
  );
};
