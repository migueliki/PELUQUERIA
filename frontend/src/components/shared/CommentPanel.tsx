"use client";

import React, { useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { User, Send, Reply, Heart, MoreHorizontal, Trash2 } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "c1",
    author: "María García",
    content: "¡Me encanta este consejo! Siempre he tenido problemas con el brillo de mi balayage y probaré estos pasos.",
    date: "Hace 2 horas",
    likes: 5,
    replies: [
      {
        id: "c2",
        author: "Baskuñana Team",
        content: "¡Gracias María! Si necesitas algún producto específico, no dudes en preguntarnos en tu próxima visita.",
        date: "Hace 1 hora",
        likes: 2,
      }
    ]
  },
  {
    id: "c3",
    author: "Carlos Ruiz",
    content: "La nueva colección se ve espectacular. El estilo mediterráneo siempre es un acierto.",
    date: "Hace 5 horas",
    likes: 8,
  }
];

const CommentPanel = () => {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");

  const addComment = (content: string) => {
    if (!content.trim()) return;
    const comment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: "Usuario Invitado",
      content,
      date: "Ahora mismo",
      likes: 0,
      replies: []
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  const addReply = useCallback((parentId: string, content: string) => {
    if (!content.trim()) return;

    const newReply: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: "Usuario Invitado",
      content,
      date: "Ahora mismo",
      likes: 0,
      replies: []
    };

    const updateComments = (list: Comment[]): Comment[] => {
      return list.map(c => {
        if (c.id === parentId) {
          return { ...c, replies: [...(c.replies || []), newReply] };
        }
        if (c.replies && c.replies.length > 0) {
          return { ...c, replies: updateComments(c.replies) };
        }
        return c;
      });
    };

    setComments(prev => updateComments(prev));
  }, []);

  const deleteComment = useCallback((id: string) => {
    const removeFromList = (list: Comment[]): Comment[] => {
      return list
        .filter(c => c.id !== id)
        .map(c => ({
          ...c,
          replies: c.replies ? removeFromList(c.replies) : []
        }));
    };
    setComments(prev => removeFromList(prev));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addComment(newComment);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-3xl font-bold text-white mb-8 tracking-tighter">Comentarios <span className="text-white/20">({comments.length})</span></h3>

      {/* Input Section */}
      <div className="mb-12 relative">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu comentario (Pulsa Enter para enviar)..."
          className="w-full bg-white/5 border border-white/10 rounded-xl p-6 text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-all min-h-[100px] resize-none"
        />
        <button
          onClick={() => addComment(newComment)}
          className="absolute bottom-6 right-6 bg-white text-black p-3 rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl"
        >
          <Send size={20} />
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        <AnimatePresence>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} onReply={addReply} onDelete={deleteComment} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const CommentItem = ({ 
  comment, 
  onReply, 
  onDelete,
  isReply = false 
}: { 
  comment: Comment; 
  onReply: (id: string, content: string) => void; 
  onDelete: (id: string) => void;
  isReply?: boolean 
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [likes, setLikes] = useState(comment.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleReplySubmit();
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex gap-4 ${isReply ? 'ml-12 mt-6' : ''}`}
    >
      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
        <User size={24} className="text-white/20" />
      </div>
      
      <div className="flex-grow">
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 relative">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-white text-sm">{comment.author}</h4>
            <span className="text-[10px] uppercase tracking-widest text-white/20">{comment.date}</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">{comment.content}</p>
          
          <div className="flex items-center gap-6 mt-4">
            <button 
              onClick={() => {
                setIsLiked(!isLiked);
                setLikes(isLiked ? likes - 1 : likes + 1);
              }}
              className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${isLiked ? 'text-red-500' : 'text-white/30 hover:text-white'}`}
            >
              <Heart size={14} className={isLiked ? 'fill-current' : ''} />
              {likes}
            </button>
            <button 
              onClick={() => setShowReplyInput(!showReplyInput)}
              className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${showReplyInput ? 'text-white' : 'text-white/30 hover:text-white'}`}
            >
              <Reply size={14} />
              Responder
            </button>
            
            {comment.author === "Usuario Invitado" && (
              <button 
                onClick={() => onDelete(comment.id)}
                className="flex items-center gap-1.5 text-xs font-bold text-red-500/50 hover:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
                Borrar
              </button>
            )}

            <button className="text-white/10 hover:text-white transition-colors ml-auto">
              <MoreHorizontal size={14} />
            </button>
          </div>
        </div>

        {/* Reply Input */}
        <AnimatePresence>
          {showReplyInput && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div className="relative">
                <input
                  autoFocus
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Responder a ${comment.author}...`}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-6 text-sm text-white outline-none focus:border-white/30 pr-12"
                />
                <button
                  onClick={handleReplySubmit}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="border-l border-white/10 mt-2">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} onReply={onReply} onDelete={onDelete} isReply={true} />
            ))}
          </div>
        )}
      </div>
    </m.div>
  );
};

export default CommentPanel;
