"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";
import {
  MessageSquare,
  ChevronDown,
  ChevronUp,
  User as UserIcon,
  Sparkles,
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
  const { user: clerkUser } = useUser();
  const userData = useAuth(clerkUser?.id);
  const user = userData?.user;

  const [showReplies, setShowReplies] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="mt-4">
      <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full">
            <UserIcon size={14} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white">
                {user?.username}
              </span>
              <span className="text-xs text-slate-500">
                • {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed mb-3">
          {comment.content}
        </p>

        {hasReplies && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-xs font-medium text-blue-300 transition-all"
          >
            {showReplies ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showReplies
              ? "Хариултуудыг нуух"
              : `Хариултуудыг харах (${comment.replies?.length})`}
          </button>
        )}
      </div>

      {showReplies && hasReplies && (
        <div className="ml-6 border-l-2 border-slate-700/50 pl-4 mt-2">
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
      <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl p-6">
        <div className="text-center text-slate-400 italic">
          Нэвтэрснээр асуулт асуух боломжтой.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-700/50">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <MessageSquare className="text-blue-400" size={20} />
          </div>
          Ask Questions
        </h3>
        <span className="px-3 py-1 bg-slate-800 rounded-full text-sm font-semibold text-slate-300">
          {comments.length}
        </span>
      </div>

      {/* Comments List */}
      <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-center py-10 text-slate-400 italic bg-slate-800/30 rounded-2xl border border-dashed border-slate-700/50">
            Одоогоор асуулт алга байна.
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="border-t border-slate-700/50 pt-6">
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Багшаас асуух зүйл байна уу?"
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none min-h-[100px]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            <Sparkles
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />
            {loading ? "Илгээж байна..." : "Асуулт илгээх"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 0.7);
        }
      `}</style>
    </div>
  );
};

export default AskTeacher;
