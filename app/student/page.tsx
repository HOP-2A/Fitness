"use client"
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

type Student = {
  id: string;
  username: string;
  traineeId: string;
  description: string;
  rate: number;
};


const Page = () => {
  const [data, setData] = useState<Student>({
  id: "",
  username: "",
  traineeId: "",
  description: "",
  rate: 0,
  });
const getExercise = async()=>{
    const res = await fetch(`/api/student${data.id}`, {
        method: "GET",
}) 

}

  return <div></div>
};

export default Page;
