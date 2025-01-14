"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const frameVariants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 1 },
};

const lineVariants: Variants = {
  visible: { pathLength: 1, opacity: 1 },
  hidden: { pathLength: 0, opacity: 0 },
};

const ScanTextIcon = () => {
  const controls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start((i) => ({
          pathLength: 0,
          opacity: 0,
          transition: { delay: i * 0.1, duration: 0.3 },
        }));
        await controls.start((i) => ({
          pathLength: 1,
          opacity: 1,
          transition: { delay: i * 0.1, duration: 0.3 },
        }));
        // Add a small pause between iterations
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    };

    animate();
  }, [controls]);

  return (
    <div className="select-none p-2 rounded-md transition-colors duration-200 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path variants={frameVariants} d="M3 7V5a2 2 0 0 1 2-2h2" />
        <motion.path variants={frameVariants} d="M17 3h2a2 2 0 0 1 2 2v2" />
        <motion.path variants={frameVariants} d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <motion.path variants={frameVariants} d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <motion.path
          variants={lineVariants}
          initial="visible"
          animate={controls}
          custom={0}
          d="M7 8h8"
        />
        <motion.path
          variants={lineVariants}
          initial="visible"
          animate={controls}
          custom={1}
          d="M7 12h10"
        />
        <motion.path
          variants={lineVariants}
          initial="visible"
          animate={controls}
          custom={2}
          d="M7 16h6"
        />
      </svg>
    </div>
  );
};

export { ScanTextIcon };
