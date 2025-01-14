"use client";
import { WordPullUp } from "@/components/text/word-pull-up";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ArrowRight, Cloud } from "lucide-react";
interface IntroProps {
  onSkipDemoClicked: () => void;
}

export default function Intro({ onSkipDemoClicked }: IntroProps) {
  return (
    <CarouselItem>
      <div className="relative w-full min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="px-20">
          <div className="flex flex-col items-center gap-8">
            <Cloud className="w-12 h-12" />
            <div className="flex items-center gap-8 md:text-5xl text-2xl font-medium">
              <WordPullUp words="CloudCheck Pitch Presentation" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "absolute",
          "bottom-14 md:bottom-4", // Adjusted bottom spacing for both mobile and desktop
          "left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0", // Centered on mobile, right-aligned on desktop
          "flex items-center justify-center" // Added flex alignment
        )}
      >
        <Button
          className="text-muted-foreground"
          variant="ghost"
          onClick={onSkipDemoClicked}
        >
          <ArrowRight /> Skip to Demo
        </Button>
      </div>
    </CarouselItem>
  );
}
