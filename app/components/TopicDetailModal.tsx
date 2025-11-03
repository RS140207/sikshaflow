"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Circle, BookOpen, Star, Trophy } from "lucide-react";
import { useState } from "react";

interface Subtopic {
  id: string;
  title: string;
  completed: boolean;
}

interface TopicDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicTitle: string;
  topicDescription: string;
  subtopics: Subtopic[];
  xpReward: number;
  onCompleteSubtopic: (subtopicId: string) => void;
  onCompleteAll: () => void;
}

export default function TopicDetailModal({
  isOpen,
  onClose,
  topicTitle,
  topicDescription,
  subtopics,
  xpReward,
  onCompleteSubtopic,
  onCompleteAll
}: TopicDetailModalProps) {
  const completedCount = subtopics.filter(st => st.completed).length;
  const totalCount = subtopics.length;
  const allCompleted = completedCount === totalCount;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl my-8 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-3xl z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-8 h-8" />
                      <h2 className="text-2xl font-bold">{topicTitle}</h2>
                    </div>
                    <p className="text-blue-100 text-sm mb-4">{topicDescription}</p>
                    
                    {/* XP Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Star className="w-5 h-5 text-yellow-300 fill-current" />
                      <span className="font-bold">+{xpReward} XP</span>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors ml-4"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Progress Section */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Learning Progress</h3>
                  <span className="text-lg font-bold text-blue-600">
                    {completedCount}/{totalCount} Completed
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  />
                </div>
              </div>

              {/* Subtopics List */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-orange-500" />
                  Complete All Items Below
                </h3>
                
                <div className="space-y-3">
                  {subtopics.map((subtopic, index) => (
                    <motion.div
                      key={subtopic.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`group relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        subtopic.completed
                          ? 'bg-green-50 border-green-500'
                          : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md'
                      }`}
                      onClick={() => !subtopic.completed && onCompleteSubtopic(subtopic.id)}
                    >
                      {/* Checkbox */}
                      <div className="flex-shrink-0 mt-1">
                        {subtopic.completed ? (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full group-hover:border-blue-500 transition-colors flex items-center justify-center">
                            <Circle className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <p className={`font-medium transition-colors ${
                          subtopic.completed ? 'text-green-700 line-through' : 'text-gray-900'
                        }`}>
                          {subtopic.title}
                        </p>
                      </div>

                      {/* Completion Badge */}
                      {subtopic.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          Done
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t p-6 rounded-b-3xl">
                {allCompleted ? (
                  <motion.button
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    onClick={() => {
                      onCompleteAll();
                      onClose();
                    }}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Trophy className="w-6 h-6" />
                    Claim {xpReward} XP Reward!
                  </motion.button>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 mb-3">
                      Complete all items to earn <span className="font-bold text-orange-600">{xpReward} XP</span>
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Continue Later
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
