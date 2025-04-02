"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { articles } from "./articledata";

interface ArticleProps {
  mood: number | null;
}

const moodNames = ["happy", "bored", "sad", "angry"];

export default function ArticleList({ mood }: ArticleProps) {
  const [filteredArticles, setFilteredArticles] = useState<
    { id: number; title: string; content: string }[]
  >([]);
  const [selectedArticle, setSelectedArticle] = useState<{ id: number; title: string; content: string } | null>(null);

  useEffect(() => {
    if (mood !== null) {
      const moodKey = moodNames[mood - 1] as keyof typeof articles;
      setFilteredArticles(articles[moodKey] || []);
    } else {
      setFilteredArticles([]);
    }
  }, [mood]);

  return (
    <>
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl md:text-2xl text-gray-800 dark:text-white mb-4 font-semibold">
          Recommended Articles
        </h2>

        {mood === null ? (
          <p className="text-gray-600 dark:text-zinc-500 text-center py-4">
            Select your mood to see related articles.
          </p>
        ) : (
          <motion.div
            key={mood} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="cust-scroll max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-gray-100 dark:scrollbar-track-zinc-800"
          >
            <AnimatePresence mode="sync">
              <div className="space-y-3">
                {filteredArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 bg-gray-50 dark:bg-zinc-900 shadow-md rounded-lg cursor-pointer hover:shadow-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-300 border border-gray-200 dark:border-zinc-700"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-zinc-400 mt-2 line-clamp-2">
                      {article.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="cust-scroll bg-white dark:bg-zinc-950 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-200 dark:border-zinc-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pr-8">
                {selectedArticle.title}
              </h2>
              <p className="text-gray-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {selectedArticle.content}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
