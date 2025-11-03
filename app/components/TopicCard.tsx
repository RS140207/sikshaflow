"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Lock, Star } from "lucide-react";

interface TopicCardProps {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  locked: boolean;
  onStart: () => void;
}

export default function TopicCard({ 
  id, 
  title, 
  description, 
  xpReward, 
  completed, 
  locked,
  onStart
}: TopicCardProps) {

  return (
    <motion.div
      whileHover={!locked ? { y: -5 } : {}}
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 ${
        completed 
          ? 'border-green-500 bg-green-50' 
          : locked 
          ? 'border-gray-300 bg-gray-50 opacity-60' 
          : 'border-blue-200 hover:border-blue-400 hover:shadow-xl'
      }`}
    >
      {/* XP Badge */}
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${
        completed ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
      }`}>
        <Star className="w-4 h-4 fill-current" />
        +{xpReward} XP
      </div>

      {/* Lock Icon for Locked Topics */}
      {locked && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>
      )}

      <div className={`p-6 ${locked ? 'blur-sm' : ''}`}>
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            completed 
              ? 'bg-green-500' 
              : 'bg-gradient-to-br from-blue-500 to-purple-600'
          }`}>
            {completed ? (
              <CheckCircle2 className="w-6 h-6 text-white" />
            ) : (
              <BookOpen className="w-6 h-6 text-white" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>

        <button
          onClick={onStart}
          disabled={completed || locked}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            completed
              ? 'bg-green-500 text-white cursor-default'
              : locked
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:-translate-y-1'
          }`}
        >
          {completed ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Completed
            </span>
          ) : locked ? (
            <span className="flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" />
              Locked
            </span>
          ) : (
            'Start Topic'
          )}
        </button>
      </div>
    </motion.div>
  );
}
