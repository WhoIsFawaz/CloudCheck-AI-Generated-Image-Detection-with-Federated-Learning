import { CarouselItem } from "@/components/ui/carousel";
import { motion } from "framer-motion";

export default function WhatIsCloudCheck() {
  return (
    <CarouselItem>
      <div className="h-screen w-full flex items-center justify-center px-8 bg-background">
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
              <span className="block">
                <span className="underline">WHAT</span> is
              </span>
              <span className="text-primary"> CloudCheck?</span>
            </h1>
          </motion.div>

          {/* Right Section */}
          <motion.div
            className="flex flex-col space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Image Analysis & Classification */}
            <div className="flex items-center space-x-4">
              <img
                src="/icons/magnifying.png"
                alt="Magnifying Glass"
                className="w-12 h-12 object-contain"
              />
              <p className="text-lg md:text-xl font-medium">
                Image analysis & Classification of <br /> Gen-AI images
              </p>
            </div>

            {/* User Data Privacy */}
            <div className="flex items-center space-x-4">
              <img
                src="/icons/ninja.png"
                alt="Ninja (Privacy)"
                className="w-12 h-12 object-contain"
              />
              <p className="text-lg md:text-xl font-medium">
                User Data Privacy
              </p>
            </div>

            {/* Cloud-Native Technologies */}
            <div className="flex items-center space-x-4">
              <img
                src="/icons/cloud.png"
                alt="Cloud"
                className="w-12 h-12 object-contain"
              />
              <p className="text-lg md:text-xl font-medium">
                Cloud-Native Technologies
              </p>
            </div>

            {/* Federated Learning */}
            <div className="flex items-center space-x-4">
              <img
                src="/icons/phone.png"
                alt="Tablet"
                className="w-12 h-12 object-contain"
              />
              <p className="text-lg md:text-xl font-medium">
                Federated Learning
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </CarouselItem>
  );
}
