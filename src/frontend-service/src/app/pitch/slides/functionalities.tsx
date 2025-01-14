import { CarouselItem } from "@/components/ui/carousel";
import { CheckCircle2, Flag, RefreshCcw } from "lucide-react";

export default function Functionalities() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-6xl px-10 grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-medium">
              What can CloudCheck do?
            </h2>
          </div>
          <div className="space-y-8">
            <h3 className="text-xl md:text-3xl flex flex-row gap-4 items-center">
              <CheckCircle2 /> Verify images
            </h3>
            <h3 className="text-xl md:text-3xl flex flex-row gap-4 items-center">
              <RefreshCcw /> Train in the browser
            </h3>
            <h3 className="text-xl md:text-3xl flex flex-row gap-4 items-center">
              <Flag /> Findings dispute
            </h3>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
