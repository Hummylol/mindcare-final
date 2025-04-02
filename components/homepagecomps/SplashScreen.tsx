import { useEffect } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete();
    }, 3000); // 3 seconds
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black text-white dark:bg-black dark:text-white"
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to MindCare</h1>
      <p className="text-lg">Your mental health companion</p>
    </motion.div>
  );
};

export default SplashScreen;
