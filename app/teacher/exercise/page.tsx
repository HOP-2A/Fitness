"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@/providers/authProvider";
import { useUsers } from "./useUsers";

type ChallengeFormData = {
  id: string;
  traineeId: string;
  teacherId: string;
  title: string;
  description: string;
  target: string;
  rate: number;
  status: "PENDING" | "ACTIVE" | "COMPLETED";
  reward: number;
};

export default function ChallengeForm() {
  const { push } = useRouter();
  const { user: clerkUser } = useUser();
  const userData = useAuth(clerkUser?.id);
  const user = userData.user;

  const { users } = useUsers();

  const [data, setData] = useState<ChallengeFormData>({
    id: "",
    traineeId: "",
    teacherId: "",
    title: "",
    description: "",
    target: "",
    rate: 0,
    status: "PENDING",
    reward: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: name === "rate" || name === "reward" ? Number(value) : value,
      teacherId: user?.id || "",
    }));
  };

  const handleSubmit = async () => {
    if (!data.traineeId) {
      toast.error("Please select a trainee");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const res = await fetch("/api/teacherSetExercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      toast.error(result.error || "Error while sending challenge");
      setIsSubmitting(false);
      return;
    }

    toast.success("Challenge submitted!");
    push("/teacher");
  };

  return (
    <div className="flex justify-center pt-10 min-h-screen bg-[#1A1F23]">
      <motion.button
        onClick={() => push("/teacher")}
        className="absolute top-6 left-6 px-5 py-2 rounded-xl bg-[#2C353C] text-[#B6E0FE] hover:bg-[#3B4A54] transition-colors"
      >
        ← Back
      </motion.button>

      <div className="w-full max-w-xl">
        <Card className="border-0 bg-[#242B31] text-[#E0E0E0] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#A3FFAB] text-2xl">
              Challenge Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1">
              <Label className="text-[#FFD580]">Trainee</Label>
              <Select
                value={data.traineeId}
                onValueChange={(value) =>
                  setData((prev) => ({ ...prev, traineeId: value }))
                }
              >
                <SelectTrigger className="bg-[#3A4047] text-white border-0 hover:bg-[#4B525B] transition-colors">
                  <SelectValue placeholder="Select trainee" />
                </SelectTrigger>

                <SelectContent className="bg-[#3A4047]">
                  {users?.map((trainee) => (
                    <SelectItem key={trainee.id} value={trainee.id}>
                      {trainee.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Input
              name="title"
              placeholder="Title"
              onChange={handleInputValue}
              className="bg-[#3A4047] placeholder-[#AAAAAA] text-white border-0 focus:ring-2 focus:ring-[#A3FFAB] transition"
            />
            <Textarea
              name="description"
              placeholder="Description"
              onChange={handleInputValue}
              className="bg-[#3A4047] placeholder-[#AAAAAA] text-white border-0 focus:ring-2 focus:ring-[#A3FFAB] transition"
            />
            <Input
              name="target"
              placeholder="Target"
              onChange={handleInputValue}
              className="bg-[#3A4047] placeholder-[#AAAAAA] text-white border-0 focus:ring-2 focus:ring-[#A3FFAB] transition"
            />
            <Input
              type="number"
              name="rate"
              placeholder="Rate"
              onChange={handleInputValue}
              className="bg-[#3A4047] placeholder-[#AAAAAA] text-white border-0 focus:ring-2 focus:ring-[#A3FFAB] transition"
            />
            <Input
              type="number"
              name="reward"
              placeholder="Reward"
              onChange={handleInputValue}
              className="bg-[#3A4047] placeholder-[#AAAAAA] text-white border-0 focus:ring-2 focus:ring-[#A3FFAB] transition"
            />
          </CardContent>

          <CardFooter>
            <Button
              className="w-full bg-[#A3FFAB] text-[#1A1F23] font-semibold hover:bg-[#8AE086] transition-colors"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Challenge"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
