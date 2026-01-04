"use client";

import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, BookOpen, User, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Reply {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
}

interface TeacherComment {
  id: string;
  content: string;
  createdAt: string;
  replies: Reply[];
  exercise: {
    id: string;
    title: string;
    description: string | null;
    trainee: {
      username: string;
    };
  };
}

interface TeacherExerciseCommentsProps {
  teacherId: string;
}

const TeacherExerciseComments: React.FC<TeacherExerciseCommentsProps> = ({
  teacherId,
}) => {
  const { back } = useRouter();
  const [comments, setComments] = useState<TeacherComment[]>([]);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!teacherId) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/teacher/exercise-comments?teacherId=${teacherId}`
        );
        const data = await res.json();
        if (res.ok) setComments(data);
      } catch (error) {
        console.error("[FETCH_COMMENTS]", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [teacherId]);


  const submitReply = async (commentId: string, exerciseId: string) => {
    const text = replyText[commentId];
    if (!text?.trim()) return;

    setLoadingId(commentId);

    try {
      const res = await fetch("/api/addCommentOnExercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
          exerciseId,
          authorId: teacherId,
          parentId: commentId,
        }),
      });

      if (res.ok) {
        setReplyText((prev) => ({ ...prev, [commentId]: "" }));

        const refetch = await fetch(
          `/api/teacher/exercise-comments?teacherId=${teacherId}`
        );
        const newData = await refetch.json();
        if (refetch.ok) setComments(newData);
      }
    } catch (error) {
      console.error("[SUBMIT_REPLY]", error);
    } finally {
      setLoadingId(null);
    }
  };


  const groupedByExercise = comments.reduce(
    (acc: Record<string, TeacherComment[]>, comment) => {
      const exerciseId = comment.exercise.id;
      if (!acc[exerciseId]) acc[exerciseId] = [];
      acc[exerciseId].push(comment);
      return acc;
    },
    {}
  );

  if (!teacherId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F1419]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#BBF246]" />
          <span className="text-sm tracking-wide text-white/70">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1F262C] p-6">
      <Button
        onClick={() => back()}
        className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-200 hover:text-gray-400 hover:cursor-pointer mb-10"
      >
        <ArrowLeft size={16} />
        Back
      </Button>

      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-100">
          <MessageSquare className="text-blue-500" />
          Сурагчдын асуултууд
        </h2>

        {loading && (
          <div className="text-center text-gray-400 italic">
            Ачаалж байна...
          </div>
        )}

        {!loading && comments.length === 0 && (
          <div className="text-gray-400 italic text-center py-10">
            Одоогоор асуулт алга байна
          </div>
        )}

        {Object.entries(groupedByExercise).map(
          ([exerciseId, exerciseComments]) => {
            const exercise = exerciseComments[0].exercise;
            return (
              <div
                key={exerciseId}
                className="bg-[#2A323A] border border-[#3A444D] rounded-xl p-6 space-y-4 shadow"
              >
                <div className="bg-[#232A31] p-4 rounded-lg border border-[#3A444D]">
                  <div className="flex items-center gap-2 font-semibold text-gray-100">
                    <BookOpen size={16} />
                    {exercise.title}
                  </div>
                  {exercise.description && (
                    <p className="text-sm text-gray-400 mt-2">
                      {exercise.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <User size={14} />
                    {exercise.trainee.username}
                  </div>
                </div>

                {exerciseComments.map((comment) => (
                  <div key={comment.id} className="space-y-2">
                    <div className="bg-[#232A31] p-4 rounded-lg border border-[#3A444D]">
                      <p className="text-gray-200">{comment.content}</p>
                    </div>

                    {comment.replies.length > 0 && (
                      <div className="ml-4 border-l border-[#3A444D] pl-4 space-y-2">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-[#1F262C] border border-[#3A444D] rounded p-3 text-sm text-gray-200"
                          >
                            {reply.content}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Textarea
                        placeholder="Энд хариултаа бичнэ..."
                        value={replyText[comment.id] || ""}
                        onChange={(e) =>
                          setReplyText((prev) => ({
                            ...prev,
                            [comment.id]: e.target.value,
                          }))
                        }
                        className="bg-[#1F262C] border-[#3A444D] text-gray-100 placeholder:text-gray-500"
                      />

                      <Button
                        onClick={() => submitReply(comment.id, exercise.id)}
                        disabled={loadingId === comment.id}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {loadingId === comment.id
                          ? "Илгээж байна..."
                          : "Хариу илгээх"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default TeacherExerciseComments;
