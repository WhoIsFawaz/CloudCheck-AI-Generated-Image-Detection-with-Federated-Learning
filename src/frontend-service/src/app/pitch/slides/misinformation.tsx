import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function Misinformation() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center xl:justify-start xl:ml-96">
        <div className="flex flex-col gap-4 relative justify-center items-center xl:justify-start xl:items-start">
          <h1 className="md:text-5xl text-2xl font-medium">
            Generated AI images is
          </h1>
          <h1 className="md:text-5xl text-2xl font-medium">
            spreading misinformation
          </h1>
          <Image
            src="/icons/warning_3d.png"
            width={60}
            height={60}
            alt="Warning"
            className="xl:absolute left-[38rem] top-14"
          />
        </div>
      </div>
    </CarouselItem>
  );
}
