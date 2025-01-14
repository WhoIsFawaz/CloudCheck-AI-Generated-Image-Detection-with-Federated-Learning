import { CarouselItem } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import {
  Briefcase,
  Cpu,
  FileText,
  LayoutGrid,
  Presentation,
  Settings,
} from "lucide-react";

export default function Synopsis() {
  return (
    <CarouselItem>
      <div className="w-full h-screen bg-background flex flex-col items-center justify-center px-4">
        {/* Title Section */}
        <motion.h1
          className="text-2xl md:text-5xl font-medium mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Synopsis
        </motion.h1>

        {/* Icon Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 md:gap-y-12 text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2, // Stagger children animations
              },
            },
          }}
        >
          {/* Background */}
          <motion.div
            className="flex flex-col items-center"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
          >
            <FileText size={48} className="mb-2 text-muted-foreground" />
            <h2 className="text-sm md:text-base font-medium">Background</h2>
          </motion.div>

          {/* Functionalities */}
          <motion.div
            className="flex flex-col items-center"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
          >
            <Settings size={48} className="mb-2 text-muted-foreground" />
            <h2 className="text-sm md:text-base font-medium">
              Functionalities
            </h2>
          </motion.div>

          {/* System Design */}
          <motion.div
            className="flex flex-col items-center"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
          >
            <Cpu size={48} className="mb-2 text-muted-foreground" />
            <h2 className="text-sm md:text-base font-medium">System Design</h2>
          </motion.div>

          {/* Microservices & Architecture */}
          <motion.div
            className="flex flex-col items-center"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
          >
            <LayoutGrid size={48} className="mb-2 text-muted-foreground" />
            <h2 className="text-sm md:text-base font-medium">
              Microservices & Architecture
            </h2>
          </motion.div>

          {/* Business Viability */}
          <motion.div
            className="flex flex-col items-center"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
          >
            <Briefcase size={48} className="mb-2 text-muted-foreground" />
            <h2 className="text-sm md:text-base font-medium">
              Business Viability
            </h2>
          </motion.div>

          {/* Demo */}
          <motion.div
            className="flex flex-col items-center"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
          >
            <Presentation size={48} className="mb-2 text-muted-foreground" />
            <h2 className="text-sm md:text-base font-medium">Demo</h2>
          </motion.div>
        </motion.div>
      </div>
    </CarouselItem>
  );
}
