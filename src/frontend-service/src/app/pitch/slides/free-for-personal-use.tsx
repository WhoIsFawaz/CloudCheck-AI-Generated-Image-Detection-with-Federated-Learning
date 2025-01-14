import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function FreeForPersonalUse() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center xl:justify-start xl:ml-96">
        <div className="flex flex-col gap-4 relative justify-center items-center xl:justify-start xl:items-start">
          <h1 className="md:text-5xl text-2xl font-medium">
            Remains free for personal use
          </h1>
          <h1 className="md:text-5xl text-2xl font-medium">
            and playground testing
          </h1>
          <Image
            src="/icons/man_technologist_3d_light.png"
            width={60}
            height={60}
            alt="Developer"
            className="xl:absolute left-[33rem] top-14"
          />
        </div>
      </div>
    </CarouselItem>
  );
}
