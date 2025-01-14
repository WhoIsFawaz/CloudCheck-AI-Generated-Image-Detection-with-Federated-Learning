import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function FederatedLearning() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-6xl px-10 items-center">
          <div className="relative w-full h-[500px] md:h-[700px]">
            <Image
              src="/architecture/federated-learning.png"
              alt="Federated Learning Flow Diagram"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
