import { CarouselItem } from "@/components/ui/carousel";

export default function FederatedLearningHeading() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col gap-4 relative justify-center items-center">
          <h1 className="md:text-5xl text-2xl font-medium">
            What's federated learning?
          </h1>
          <p className="text-muted-foreground text-lg md:text-2xl">
            Microservices & Architecture
          </p>
        </div>
      </div>
    </CarouselItem>
  );
}
