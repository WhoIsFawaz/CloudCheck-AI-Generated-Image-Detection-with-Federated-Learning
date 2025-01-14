"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";

interface WordPullUpProps {
  words: string;
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
}

export function WordPullUp({
  words,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
}: WordPullUpProps) {
  const controls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start("show");
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Stay visible for 3 seconds
        await controls.start("hidden");
        await new Promise((resolve) => setTimeout(resolve, 500)); // Brief pause before next iteration
      }
    };

    animate();
  }, [controls]);

  return (
    <motion.h1
      variants={wrapperFramerProps}
      initial="hidden"
      animate={controls}
      className={cn(
        "font-display text-center md:text-5xl text-2xl flex items-center gap-8 font-medium leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className
      )}
    >
      {words.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={framerProps}
          style={{ display: "inline-block", paddingRight: "8px" }}
        >
          {word === "" ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
