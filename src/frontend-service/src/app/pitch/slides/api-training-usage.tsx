import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function APITrainingUsage() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center xl:justify-start xl:ml-96">
        <div className="flex flex-col gap-4 relative justify-center items-center xl:justify-start xl:items-start">
          <h1 className="md:text-5xl text-2xl font-medium">
            API usage not trained to
          </h1>
          <h1 className="md:text-5xl text-2xl font-medium">preserve privacy</h1>
          <Image
            src="/icons/locked_3d.png"
            width={60}
            height={60}
            alt="Yellow Lock"
            className="xl:absolute left-[24rem] top-14"
          />
        </div>
      </div>
    </CarouselItem>
  );
}
