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
  createdAt: string;
  updatedAt: string;
};

export default function ChallengeForm() {
  const [formData, setFormData] = useState<ChallengeFormData>({
    id: "lr3istxnNkfee22Tark5T",
    traineeId: "nMK5CXR1IxJkAGw4qn0Mo",
    teacherId: "N9bQMpN9MTVYFAvkMwN1l",
    title: "Push-up Challenge",
    description: "Do 50 push-ups every day for a week",
    target: "Strength",
    rate: 5,
    status: "PENDING",
    reward: 0,
    createdAt: "2025-11-25T14:38:19.362Z",
    updatedAt: "2025-11-25T14:38:19.362Z",
  });

  const handleChange = <K extends keyof ChallengeFormData>(
    field: K,
    value: ChallengeFormData[K]
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    toast.success("hudlaa ch gesen ajillaa");
  };

  return (
    <div className="flex justify-center pt-10">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Challenge Details
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-1">
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <Label>Target</Label>
            <Input
              value={formData.target}
              onChange={(e) => handleChange("target", e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <Label>Rate</Label>
            <Input
              type="number"
              value={formData.rate}
              onChange={(e) => handleChange("rate", Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(v) =>
                handleChange("status", v as ChallengeFormData["status"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1">
            <Label>Reward</Label>
            <Input
              type="number"
              value={formData.reward}
              onChange={(e) => handleChange("reward", Number(e.target.value))}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Submit Challenge
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
