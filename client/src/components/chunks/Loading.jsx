import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  "This is a free trial… so I may be slow",
  "Warming up my circuits...",
  "Thinking hard... maybe too hard",
  "Request received. Coffee break started",
  "Stay calm and let the AI cook",
];

const Loading = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 h-screen w-screen z-50 flex flex-col items-center justify-center gap-10 bg-black/70 backdrop-blur-sm">
      
      {/* Pulse Animation */}
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-100"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{scale: [1, 2], opacity: [0.8, 0] }}
          transition={{
            
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.5,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
  initial={{ rotate: 0 }}
  animate={{ rotate: 180 }}
  transition={{
    repeat: Infinity,
    repeatType: "reverse",
    duration: 2,
    ease: "linear",
  }}
  className="relative w-full h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl"
/>

      </div>

      {/* Cycling Text */}
      <motion.p
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="text-xl my-5 font-semibold text-white drop-shadow-lg text-center px-6 max-w-md"
      >
        {messages[index]}
      </motion.p>
    </div>
  );
};

export default Loading;
