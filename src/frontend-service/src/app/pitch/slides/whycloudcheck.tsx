import { CarouselItem } from "@/components/ui/carousel";
import { motion } from "framer-motion";

export default function WhyCloudCheck() {
  return (
    <CarouselItem>
      <div className="h-screen w-full flex items-center justify-center px-6 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl">
          {/* Left Section */}
          <motion.div
            className="flex flex-col space-y-4 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-500 text-lg italic">Background</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              <span className="block">WHY</span>
              <span className="text-primary">CloudCheck</span> is useful?
            </h1>
          </motion.div>

          {/* Right Section */}
          <motion.div
            className="flex flex-col space-y-4 text-center md:text-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground">Out of</p>
            <p className="text-5xl md:text-6xl font-bold text-primary">
              135,838
            </p>
            <p className="text-xl md:text-2xl text-muted-foreground">
              fact checks
            </p>
            <p className="text-lg md:text-xl font-medium">
              <span className="font-bold">80%</span> misinformation claims were
              images
            </p>
          </motion.div>
        </div>
      </div>
    </CarouselItem>
  );
}
