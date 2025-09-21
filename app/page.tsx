"use client";

import { title, subtitle } from "@/components/primitives";
import { Saira } from "next/font/google";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import Link from "next/link";
import { Play } from "lucide-react";

const saira = Saira({ subsets: ["latin"], weight: ["400", "700"] });

const typewriterText = "Every Great Mystery Begins With a ";
const twistText = "Twist ";

export default function Home() {
  const [displayed, setDisplayed] = useState("");
  const [showTwist, setShowTwist] = useState(false);

  useEffect(() => {
    if (displayed.length < typewriterText.length) {
      const timeout = setTimeout(() => {
        setDisplayed(typewriterText.slice(0, displayed.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [displayed]);

  useEffect(() => {
    if (displayed.length === typewriterText.length && !showTwist) {
      const twistTimeout = setTimeout(() => setShowTwist(true), 200);
      return () => clearTimeout(twistTimeout);
    }
  }, [displayed, showTwist]);

  return (
    <section className="z-10 flex flex-col items-center justify-center gap-4">
      <div className={`${saira.className} inline-block text-center justify-center`}>
        <motion.span
          className="text-6xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {displayed}
          {showTwist && (
            <motion.span
              className="text-6xl font-bold text-purple-600"
              style={{ display: "inline-block", transformOrigin: "60% 60%" }}
              initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                rotate: [0, 30, -30, 15, -15, 0],
                scale: [0.9, 1.1, 1],
              }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              {twistText}
            </motion.span>
          )}
        </motion.span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          PlotTwist lets you create interactive mysteries where you control the suspects, clues, and shocking reveals.
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/app" passHref>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-violet-700 text-white shadow-lg"
          >
            <Play />
            Play
          </Button>
        </Link>
      </div>
        
    </section>
  );
}