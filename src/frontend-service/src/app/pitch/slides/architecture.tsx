import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function Architecture() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-6xl px-10 items-center">
          <div className="relative w-full h-[500px] md:h-[700px]">
            <Image
              src="/architecture/architecture.png"
              alt="System Architecture Diagram"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
