import { ChartColumnBig, House, ListOrdered, Rocket, User } from "lucide-react";
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
      <div className="hover:cursor-pointer">
        <ListOrdered />
      </div>
      <div className="hover:cursor-pointer">
        <ChartColumnBig />
      </div>
      <div>
        <Link href="/login">
          <User />
        </Link>
        {/* Zolo oroldood uzeerei hohishu */}
      </div>
    </div>
  );
};
