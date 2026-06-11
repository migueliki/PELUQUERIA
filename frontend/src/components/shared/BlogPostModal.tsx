"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Calendar, User, Heart } from "lucide-react";
import { BlogPost } from "@/data/blog";
import CommentPanel from "./CommentPanel";
import ShareMenu from "./ShareMenu";
import { useScrollLock } from "@/hooks/useScrollLock";

interface BlogPostModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogPostModal = ({ post, isOpen, onClose }: BlogPostModalProps) => {
  useScrollLock(isOpen);

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!post) {
    return null;
  }

  return <BlogPostModalContent key={post.id} isOpen={isOpen} onClose={onClose} post={post} />;
};

const BlogPostModalContent = ({
  post,
  isOpen,
  onClose,
}: BlogPostModalProps & { post: BlogPost }) => {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked((previous) => {
      setLikes((currentLikes) => (previous ? currentLikes - 1 : currentLikes + 1));
      return !previous;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12 lg:p-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative flex h-full max-h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_0_50px_rgba(0,0,0,0.5)] lg:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 z-50 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20"
            >
              <X size={24} />
            </button>

            <div className="h-1/2 overflow-y-auto border-r border-white/5 scrollbar-hide lg:h-auto lg:w-1/2">
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <span className="rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-widest text-black">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="relative flex flex-wrap items-center justify-between gap-6 border-b border-white/5 px-10 py-8 lg:px-16">
                <div className="flex items-center gap-10">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-3 transition-all duration-300 ${isLiked ? "scale-110 text-red-500" : "text-white/40 hover:text-white"}`}
                  >
                    <Heart size={24} className={isLiked ? "fill-current" : ""} />
                    <span className="text-xl font-bold">{likes}</span>
                  </button>

                  <ShareMenu iconSize={24} />
                </div>

                <div className="flex items-center gap-6 text-xs text-white/30">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                </div>
              </div>

              <div className="p-10 lg:p-16">
                <h2 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-white md:text-6xl">
                  {post.title}
                </h2>

                <div className="space-y-6 text-lg font-light leading-relaxed text-white/60">
                  <p>{post.excerpt}</p>
                  <p>{post.content}</p>
                </div>
              </div>
            </div>

            <div className="h-1/2 overflow-y-auto bg-black/20 custom-scrollbar lg:h-auto lg:w-1/2">
              <div className="p-10 lg:p-16">
                <CommentPanel />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BlogPostModal;
