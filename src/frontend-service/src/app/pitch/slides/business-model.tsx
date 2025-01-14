import { CarouselItem } from "@/components/ui/carousel";

export default function BusinessModel() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-6xl px-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-medium">Business Model</h2>
          </div>
          <div className="space-y-8">
            <h3 className="text-xl md:text-3xl">
              Subscription for increased limits
            </h3>
            <h3 className="text-xl md:text-3xl">API for commercial use</h3>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
