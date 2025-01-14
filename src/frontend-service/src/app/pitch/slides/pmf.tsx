import { CarouselItem } from "@/components/ui/carousel";

export default function PMF() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col gap-4 relative justify-center items-center">
          <h1 className="md:text-5xl text-2xl font-medium">
            How we achieve product market fit
          </h1>
          <p className="text-muted-foreground text-lg md:text-2xl">
            Business Viability
          </p>
        </div>
      </div>
    </CarouselItem>
  );
}
