import { CarouselItem } from "@/components/ui/carousel";
import { Cloud } from "lucide-react";

export default function FunctionalitiesHeading() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-row gap-4 md:gap-6 relative justify-center items-center">
          <h1 className="md:text-5xl text-2xl font-medium">Functionalities</h1>
          <Cloud className="md:w-14 md:h-14 w-8 h-8" />
        </div>
      </div>
    </CarouselItem>
  );
}
