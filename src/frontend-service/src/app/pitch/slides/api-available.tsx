import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function APIAvailable() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center xl:justify-start xl:ml-96">
        <div className="flex flex-col gap-4 relative justify-center items-center xl:justify-start xl:items-start">
          <h1 className="md:text-5xl text-2xl font-medium">
            Available as an API for
          </h1>
          <h1 className="md:text-5xl text-2xl font-medium">
            commercial systems
          </h1>
          <Image
            src="/icons/check_mark_button_3d.png"
            width={60}
            height={60}
            alt="Check Mark"
            className="xl:absolute left-[31rem] top-14"
          />
        </div>
      </div>
    </CarouselItem>
  );
}
