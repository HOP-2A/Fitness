import { Footer } from "../_components/Footer";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { user } = useUser();

  if (user === null) {
    router.push("/teacher/login");
  }
  return <div>hi</div>;
};
export default Page;
