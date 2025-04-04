import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  // Dollar signs with different sizes and positions
  const dollarSigns = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 36) + 20, // Larger size between 20-56px for full screen
    left: `${Math.random() * 90 + 5}%`,
    delay: i * 0.15,
    duration: 2.5 + Math.random() * 3
  }));

  // Coins with different sizes - more coins for fullscreen
  const coins = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 24) + 32, // Larger size between 32-56px
    left: `${Math.random() * 80 + 10}%`,
    delay: i * 0.2,
    duration: 3.5 + Math.random() * 4
  }));

  return (
    <div className="fixed inset-0 w-full h-full bg-green-50 overflow-hidden flex items-center justify-center">
      {/* Background with money pattern - larger pattern for fullscreen */}
      <motion.div 
        className="absolute inset-0 bg-green-100"
        animate={{ 
          backgroundImage: [
            "radial-gradient(circle, #e0f2e9 10%, transparent 10%)",
            "radial-gradient(circle, #e0f2e9 12%, transparent 12%)"
          ],
          backgroundSize: ["50px 50px", "55px 55px", "50px 50px"],
          backgroundPosition: ["0 0", "25px 25px", "0 0"]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated dollar signs floating up - distributed across full screen */}
      <div className="absolute inset-0 overflow-hidden">
        {dollarSigns.map(sign => (
          <motion.div
            key={`dollar-${sign.id}`}
            className="absolute text-green-600 font-bold"
            style={{ 
              fontSize: sign.size,
              left: sign.left,
              bottom: "-100px"
            }}
            animate={{ 
              y: [0, -800], // Longer travel distance for fullscreen
              opacity: [0, 1, 0],
              rotate: [0, sign.id % 2 === 0 ? 15 : -15],
              scale: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: sign.duration,
              delay: sign.delay,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            $
          </motion.div>
        ))}
      </div>

      {/* Animated gold coins - more coins distributed across full screen */}
      <div className="absolute inset-0 overflow-hidden">
        {coins.map(coin => (
          <motion.div
            key={`coin-${coin.id}`}
            className="absolute rounded-full flex items-center justify-center"
            style={{ 
              width: coin.size,
              height: coin.size,
              left: coin.left,
              bottom: "-100px"
            }}
            animate={{ 
              y: [0, -700 - coin.size], // Longer travel distance for fullscreen
              opacity: [0, 1, 0],
              rotateY: [0, 360],
              boxShadow: [
                "0 0 0 gold",
                "0 0 12px gold", // Larger glow for fullscreen
                "0 0 0 gold"
              ]
            }}
            transition={{ 
              duration: coin.duration,
              delay: coin.delay,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <motion.div
              className="w-full h-full bg-yellow-400 rounded-full border-3 border-yellow-600 flex items-center justify-center text-yellow-800"
              animate={{ 
                backgroundColor: ["#fbbf24", "#f59e0b", "#fbbf24"],
                borderColor: ["#ca8a04", "#d97706", "#ca8a04"]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              {coin.id % 2 === 0 && <span className="text-sm font-bold">$</span>}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Wallet in the center - larger for fullscreen */}
      <motion.div
        className="relative z-10 w-48 h-36 bg-green-800 rounded-xl shadow-xl overflow-hidden"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 1, -1, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Wallet details */}
        <div className="absolute top-0 left-0 w-full h-12 bg-green-900 flex items-center justify-center">
          <div className="w-12 h-6 bg-yellow-600 rounded-full" />
        </div>
        
        {/* Money sticking out of wallet - larger bills for fullscreen */}
        <motion.div
          className="absolute top-12 left-6 w-36 h-6 bg-green-400 rounded-sm flex items-center justify-center"
          animate={{ 
            y: [-3, 3, -3],
            rotateZ: [0, 2, 0, -2, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-sm text-green-900 font-bold">$100</span>
        </motion.div>
    
        
        <motion.div
          className="absolute top-24 left-10 w-28 h-6 bg-green-400 rounded-sm flex items-center justify-center"
          animate={{ 
            y: [-1.5, 1.5, -1.5],
            rotateZ: [0, 1.5, 0, -1.5, 0]
          }}
          transition={{ duration: 3.2, repeat: Infinity }}
        >
          <span className="text-sm text-green-900 font-bold">$20</span>
        </motion.div>
      </motion.div>

      {/* Large dollar sign backdrop behind wallet */}
      <motion.div
        className="absolute text-green-200 opacity-10 font-bold text-9xl"
        animate={{ 
          scale: [0.95, 1.05, 0.95],
          rotate: [-5, 5, -5]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        $
      </motion.div>

      {/* Loading text - larger for fullscreen */}
      <motion.div 
        className="absolute bottom-16 text-center text-green-800 font-bold text-xl"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Processing...
      </motion.div>

      {/* Spinning dollar indicator - larger for fullscreen */}
      <motion.div
        className="absolute bottom-8 flex items-center space-x-2"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={`dot-${dot}`}
            className="w-3 h-3 rounded-full bg-green-700"
            animate={{ scale: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 1, 
              repeat: Infinity,
              delay: dot * 0.3
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loader;