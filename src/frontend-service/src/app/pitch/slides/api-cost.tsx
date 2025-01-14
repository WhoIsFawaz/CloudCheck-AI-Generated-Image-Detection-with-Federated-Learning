import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function APICost() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center xl:justify-start xl:ml-96">
        <div className="flex flex-col gap-4 relative justify-center items-center xl:justify-start xl:items-start">
          <h1 className="md:text-5xl text-2xl font-medium">
            API metered usage at
          </h1>
          <h1 className="md:text-5xl text-2xl font-medium">$0.005 per image</h1>
          <Image
            src="/icons/magnifying_glass_tilted_right_3d.png"
            width={60}
            height={60}
            alt="Magnifying Glass"
            className="xl:absolute left-[26rem] top-14"
          />
        </div>
      </div>
    </CarouselItem>
  );
}
