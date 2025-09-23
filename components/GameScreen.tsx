"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@heroui/button";

// Types
type Choice = {
  label: string;
  next: string;
  clue?: string;
  xp?: number;
};

type Scene = {
  text: string;
  choices: Choice[];
};

type Mystery = {
  title: string;
  description: string;
  start: string;
  scenes: Record<string, Scene>;
};

// Particle background component
const ParticleBackground = () => {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    const newParticles: typeof particles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="bg-white rounded-full opacity-20"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.y}%`,
            left: `${p.x}%`,
            position: "absolute",
          }}
          animate={{ y: [`${p.y}%`, `${p.y + 100}%`] }}
          transition={{ duration: 20 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

// Main component
export default function InteractiveBook({ mystery }: { mystery: Mystery }) {
  const [started, setStarted] = useState(false);
  const [currentScene, setCurrentScene] = useState(mystery.start);
  const [blockIndex, setBlockIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [showChoices, setShowChoices] = useState(false); // New state

  const scene = mystery.scenes[currentScene];

  // Split text into lines and group into 2-line blocks
  const lines = scene.text.split(/(?<=[.?!])\s+/);
  const blocks: string[] = [];
  for (let i = 0; i < lines.length; i += 2) {
    blocks.push(lines.slice(i, i + 2).join(" "));
  }

  const handleNext = () => {
    if (blockIndex < blocks.length - 1) {
      setBlockIndex(blockIndex + 1);
    } else {
      setShowChoices(true); // Show choices only after clicking final next
    }
  };

  const handleChoice = (choice: Choice) => {
    if (choice.xp) setXp(xp + choice.xp);
    setCurrentScene(choice.next);
    setBlockIndex(0);
    setShowChoices(false);
  };

  if (!started) {
    return (
      <div className="w-[1000px] h-screen relative flex flex-col justify-center items-center px-6 text-center overflow-hidden">
        <ParticleBackground />
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold text-white z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {mystery.title}
        </motion.h1>
        <motion.p
          className="text-gray-300 text-xl md:text-2xl max-w-3xl z-10 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {mystery.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Button
            variant="ghost"
            className="mt-8 px-10 py-4 bg-purple-700 text-white text-xl rounded-3xl hover:bg-purple-800 transition-all duration-300 z-10"
            onClick={() => setStarted(true)}
          >
            Start
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen relative flex flex-col justify-start items-center px-6 overflow-hidden">
      <ParticleBackground />

      {/* Navbar */}
      <div className="w-[800px] max-w-full flex justify-between items-center p-4 bg-black/40 backdrop-blur-md text-white rounded-b-2xl shadow-lg z-10 mx-auto">
        <div className="text-lg font-semibold">{mystery.title}</div>
        <div className="flex items-center gap-6">
          <div>Block {blockIndex + 1}/{blocks.length}</div>
          <div className="flex items-center gap-1">
            <Star size={20} className="text-yellow-400 animate-pulse" /> {xp} XP
          </div>
        </div>
      </div>

      {/* Animated text block */}
      <div className="flex-grow flex flex-col justify-center items-center px-6 text-center z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={blockIndex}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="text-white text-3xl leading-relaxed max-w-3xl"
          >
            {blocks[blockIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Next button */}
        {!showChoices && (
          <Button
            variant="ghost"
            className="mt-8 flex items-center gap-3 px-10 py-4 text-white text-xl font-bold rounded-3xl border border-purple-600 hover:bg-purple-700 transition-all duration-300"
            onClick={handleNext}
          >
            {blockIndex < blocks.length - 1 ? "Next" : "Show Options"} <ArrowRight size={24} />
          </Button>
        )}

        {/* Choices */}
        {showChoices && scene.choices.length > 0 && (
          <div className="mt-8 flex flex-col space-y-4 w-full max-w-md">
            {scene.choices.map((choice, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Button
                  variant="ghost"
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-700 to-pink-600 text-white font-bold rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => handleChoice(choice)}
                >
                  {choice.label}
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
