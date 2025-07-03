"use client";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

const SkillText = () => {
  return (
    <div className="w-full text-center mb-8 px-2">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-500 px-3 py-1.5 rounded-full mb-3"
      >
        <SparklesIcon className="h-4 w-4 text-white mr-1.5" />
        <span className="text-white text-xs font-medium">
          Technical Skills
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent"
      >
        My Expertise
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-sm text-gray-300 max-w-xs mx-auto"
      >
        Tap the arrows to browse
      </motion.p>
    </div>
  );
};

export default SkillText;