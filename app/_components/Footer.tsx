import { House, ListOrdered, Rocket, User } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 flex justify-between w-screen  px-8 py-4 bg-white">
      <div className="flex gap-2">
        <Link href="/">
          <House />
        </Link>
      </div>
      <div className="hover:cursor-pointer">
        <Rocket />
      </div>
      <Link href="/leader">
        <div className="hover:cursor-pointer">
          <ListOrdered />
        </div>
      </Link>

      <div>
        <Link href="/user">
          <User />
        </Link>
      </div>
    </div>
  );
};
