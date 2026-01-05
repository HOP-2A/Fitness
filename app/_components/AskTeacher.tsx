"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";
import {
  MessageSquare,
  ChevronDown,
  ChevronUp,
  User as UserIcon,
} from "lucide-react";

interface Comment {
  id: string;
  content: string;
  authorId: string;
  parentId: string | null;
  createdAt: string;
  replies?: Comment[];
}

const CommentItem = ({ comment }: { comment: Comment }) => {
  const [showReplies, setShowReplies] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="mt-4">
      <div className="bg-[#2A323A] p-4 rounded-lg border border-[#3A444D]">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-[#1F262C] p-1 rounded-full border border-[#3A444D]">
            <UserIcon size={14} className="text-gray-300" />
          </div>
          <span className="font-semibold text-xs text-gray-200">
            {comment.authorId}
          </span>
          <span className="text-[10px] text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>

        <p className="text-sm text-gray-200 leading-relaxed">
          {comment.content}
        </p>

        {hasReplies && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="mt-3 text-xs font-semibold text-blue-400 hover:text-blue-500 transition flex items-center gap-1 bg-[#232A31] px-2 py-1 rounded border border-[#3A444D] hover:cursor-pointer"
          >
            {showReplies ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showReplies
              ? "Хариултуудыг нуух"
              : `Хариултуудыг харах (${comment.replies?.length})`}
          </button>
        )}
      </div>

      {showReplies && hasReplies && (
        <div className="ml-6 border-l border-[#3A444D] pl-4 mt-2">
          {comment.replies?.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

const AskTeacher = ({ exerciseId }: { exerciseId: string }) => {
  const { user: clerkUser } = useUser();
  const userData = useAuth(clerkUser?.id);
  const user = userData?.user;

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  const buildTree = (list: Comment[]) => {
    const map: Record<string, Comment> = {};
    const roots: Comment[] = [];

    list.forEach((item) => {
      map[item.id] = { ...item, replies: [] };
    });

    list.forEach((item) => {
      if (item.parentId && map[item.parentId]) {
        map[item.parentId].replies?.push(map[item.id]);
      } else {
        roots.push(map[item.id]);
      }
    });

    return roots;
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/getEachExerciseComment/${exerciseId}`);
      const data = await res.json();
      if (res.ok) setComments(buildTree(data));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (exerciseId) fetchComments();
  }, [exerciseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/addCommentOnExercise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: commentText,
          exerciseId,
          authorId: user.id,
          parentId: null,
        }),
      });

      if (res.ok) {
        setCommentText("");
        await fetchComments();
      }
    } catch (error) {
      alert("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-center border border-[#3A444D] rounded-xl bg-[#2A323A] text-gray-400 italic">
        Нэвтэрснээр асуулт асуух боломжтой.
      </div>
    );
  }

  return (
    <div className="bg-[#1F262C] p-6 rounded-2xl border border-[#3A444D] max-w-2xl mx-auto">
      <h3 className="text-lg font-bold text-gray-100 mb-6 flex items-center gap-2">
        <MessageSquare className="text-blue-500" size={20} />
        Ask question from teacher ({comments.length})
      </h3>

      <div className="mb-8 max-h-[600px] overflow-y-auto pr-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-center py-10 text-gray-400 italic bg-[#2A323A] rounded-lg border border-dashed border-[#3A444D]">
            Одоогоор асуулт алга байна.
          </div>
        )}
      </div>

      <div className="border-t border-[#3A444D] pt-6">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Багшаас асуух зүйл байна уу?"
            className="bg-[#232A31] border-[#3A444D] text-gray-100 placeholder:text-gray-500 min-h-[100px]"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 hover:cursor-pointer"
          >
            {loading ? "Илгээж байна..." : "Асуулт илгээх"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AskTeacher;
