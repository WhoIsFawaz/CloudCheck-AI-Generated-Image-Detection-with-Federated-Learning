import { CursorClickIcon } from "@/components/icons/cursor-click";
import { CarouselItem } from "@/components/ui/carousel";

export default function InteractiveDemo() {
  return (
    <CarouselItem>
      <div className="relative w-full min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <CursorClickIcon />
          <div className="flex items-center gap-8 md:text-5xl text-2xl font-medium">
            <span>Interactive Demo</span>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
