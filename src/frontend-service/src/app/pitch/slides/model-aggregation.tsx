import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function ModelAggregation() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-6xl px-10 items-center">
          <div className="relative w-full h-[300px] md:h-[500px]">
            <Image
              src="/architecture/model-aggregation-light.png"
              alt="Model Aggregation Flow Diagram"
              layout="fill"
              objectFit="contain"
              className="block dark:hidden"
            />
            <Image
              src="/architecture/model-aggregation-dark.png"
              alt="Model Aggregation Flow Diagram"
              layout="fill"
              objectFit="contain"
              className="hidden dark:block"
            />
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
