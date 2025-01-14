import { CarouselItem } from "@/components/ui/carousel";

export default function SubscriptionCost() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center xl:justify-start xl:ml-96">
        <div className="flex flex-col gap-4 relative justify-center items-center xl:justify-start xl:items-start">
          <h1 className="md:text-5xl text-2xl font-medium">
            Subscription at $20/month
          </h1>
          <h1 className="md:text-5xl text-2xl font-medium">
            for increased usage limits
          </h1>
        </div>
      </div>
    </CarouselItem>
  );
}
