"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { Heart, MessageCircle, Share2, Calendar, User, ArrowRight } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/data/blog";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import BlogPostModal from "../shared/BlogPostModal";
import ShareMenu from "../shared/ShareMenu";

const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section className="py-24 bg-transparent relative z-10">
      <div className="container mx-auto px-6">
        <m.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {BLOG_POSTS.map((post) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              onOpen={() => setSelectedPost(post)}
            />
          ))}
        </m.div>
      </div>

      <BlogPostModal 
        post={selectedPost} 
        isOpen={!!selectedPost} 
        onClose={() => setSelectedPost(null)} 
      />
    </section>
  );
};

const BlogCard = ({ post, onOpen }: { post: BlogPost, onOpen: () => void }) => {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <m.div
      variants={fadeInUp}
      onClick={onOpen}
      className="glass-dark rounded-lg border border-white/5 overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col cursor-pointer h-full"
    >
      {/* Image Area */}
      <div className="relative h-72 overflow-hidden">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-6 left-6">
          <span className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-white/30 text-xs mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={14} />
            <span>{post.author}</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-white/80 transition-colors tracking-tighter">
          {post.title}
        </h3>
        
        <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow font-light">
          {post.excerpt}
        </p>

        {/* Interaction Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-6">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 transition-all duration-300 ${isLiked ? 'text-red-500 scale-110' : 'text-white/40 hover:text-white'}`}
            >
              <Heart size={20} className={isLiked ? "fill-current" : ""} />
              <span className="text-sm font-bold">{likes}</span>
            </button>
            <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
              <MessageCircle size={20} />
              <span className="text-sm font-bold">{post.comments}</span>
            </button>
          </div>
          
          <ShareMenu align="right" iconSize={20} />
        </div>

        <button className="mt-8 flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest group/btn">
          Leer más <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
        </button>
      </div>
    </m.div>
  );
};

export default BlogSection;
