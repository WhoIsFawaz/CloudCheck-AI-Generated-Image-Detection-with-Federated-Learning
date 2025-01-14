import { CarouselItem } from "@/components/ui/carousel";

export default function TargetMarket() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-6xl px-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-medium">Target Market</h2>
            <p className="text-lg md:text-2xl text-muted-foreground">
              Business Viability
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="text-xl md:text-3xl">Social Media</h3>
            <h3 className="text-xl md:text-3xl">News Media</h3>
            <h3 className="text-xl md:text-3xl">Corporate Media</h3>
            <h3 className="text-xl md:text-3xl">User-generated Content</h3>
            <h3 className="text-xl md:text-3xl">Freelance Journalists</h3>
            <h3 className="text-xl md:text-3xl">Academic Institutions</h3>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
