import { ThemeToggle } from "@/components/theme-toggle";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function SlideToolbar({
  current,
  count,
}: {
  current: number;
  count: number;
}) {
  return (
    <>
      {/* <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-row items-center justify-center">
            <ThemeToggle />
          </div>
        </div> */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-row items-center justify-center">
          <CarouselPrevious className="text-foreground" />
          <div className="flex flex-col gap-2 items-center rounded-full text-sm text-foreground">
            {/* <div className="flex flex-col gap-2 items-center py-2 px-4 bg-muted/50 rounded-full text-sm text-foreground"> */}
            <div className="flex flex-col gap-1">
              <ThemeToggle />
              {/* Slide {current} of {count} */}
              {/* <Progress value={(current / count) * 100} className="h-1" /> */}
            </div>
          </div>
          <CarouselNext className="text-foreground" />
        </div>
      </div>
    </>
  );
}
