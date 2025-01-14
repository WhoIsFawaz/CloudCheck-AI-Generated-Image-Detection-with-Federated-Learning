import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function OurSolution() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-6xl px-10 grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl flex flex-row items-center gap-4 font-medium">
              Our Solution
              <Image
                src="/icons/green_circle_3d.png"
                width={40}
                height={40}
                alt="Green Circle Orb"
                className="h-6 w-6 md:h-10 md:w-10"
              />
            </h2>
          </div>
          <div className="space-y-8">
            <h3 className="text-xl md:text-3xl flex flex-row gap-4 items-center">
              Semi real-time image analysis
            </h3>
            <h3 className="text-xl md:text-3xl flex flex-row gap-4 items-center">
              Advanced machine learning models
            </h3>
            <h3 className="text-xl md:text-3xl flex flex-row gap-4 items-center">
              Distributed model retraining
            </h3>
            <h3 className="text-xl md:text-3xl flex flex-row gap-4 items-center">
              Intuitive web application interface
            </h3>
            <h3 className="text-xl md:text-3xl flex flex-row gap-4 items-center">
              Preserve user privacy
            </h3>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
