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
  const [data, setData] = useState<ChallengeFormData>({
    id: "",
    traineeId: "nMK5CXR1IxJkAGw4qn0Mo",
    teacherId: "N9bQMpN9MTVYFAvkMwN1l",
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
    }));
  };

  const handleSubmit = async () => {
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
  const Back = () => {
    push("/teacher");
  };
  return (
    <div
      className="flex justify-center pt-10 min-h-screen"
      style={{ backgroundColor: "#192126" }}
    >
      <motion.button
        onClick={Back}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="
    absolute top-6 left-6
    px-5 py-2 
    rounded-xl 
    font-medium 
    shadow-lg 
    transition-all 
    bg-[#2F3A41] 
    text-[#BBF246]
    hover:bg-[#3F4A51]
    hover:shadow-[0_0_12px_#BBF246]
    active:scale-95
  "
      >
        ← Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl"
      >
        <Card
          className="w-full shadow-lg border-0"
          style={{ backgroundColor: "#384046", color: "#8B8F92" }}
        >
          <CardHeader>
            <CardTitle
              className="text-2xl font-semibold"
              style={{ color: "#BBF246" }}
            >
              Challenge Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1">
              <Label style={{ color: "#FCC46F" }}>Title</Label>
              <Input
                name="title"
                placeholder="Enter challenge title"
                className="border-0 focus:ring-2"
                style={{ backgroundColor: "#5E6468", color: "white" }}
                onChange={handleInputValue}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label style={{ color: "#FCC46F" }}>Description</Label>
              <Textarea
                name="description"
                placeholder="Describe the challenge"
                className="border-0 focus:ring-2"
                style={{ backgroundColor: "#5E6468", color: "white" }}
                onChange={handleInputValue}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label style={{ color: "#FCC46F" }}>Target</Label>
              <Input
                name="target"
                placeholder="Strength, Endurance, etc."
                className="border-0 focus:ring-2"
                style={{ backgroundColor: "#5E6468", color: "white" }}
                onChange={handleInputValue}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label style={{ color: "#FCC46F" }}>Rate</Label>
              <Input
                name="rate"
                type="number"
                max="5"
                min="0"
                placeholder="Enter difficulty rate"
                className="border-0 focus:ring-2"
                style={{ backgroundColor: "#5E6468", color: "white" }}
                onChange={handleInputValue}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label style={{ color: "#FCC46F" }}>Status</Label>

              <Select
                value={data.status}
                onValueChange={(v) =>
                  setData((prev) => ({
                    ...prev,
                    status: v as ChallengeFormData["status"],
                  }))
                }
              >
                <SelectTrigger
                  className="border-0"
                  style={{ backgroundColor: "#5E6468", color: "white" }}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent style={{ backgroundColor: "#5E6468" }}>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1">
              <Label style={{ color: "#FCC46F" }}>Reward</Label>
              <Input
                name="reward"
                type="number"
                min="0"
                placeholder="Reward points"
                className="border-0 focus:ring-2"
                style={{ backgroundColor: "#5E6468", color: "white" }}
                onChange={handleInputValue}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button
              disabled={isSubmitting}
              className="w-full font-semibold py-3 rounded-xl shadow-md"
              style={{
                backgroundColor: "#A48AED",
                color: "white",
                opacity: isSubmitting ? 0.6 : 1,
              }}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Submitting..." : "Submit Challenge"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
