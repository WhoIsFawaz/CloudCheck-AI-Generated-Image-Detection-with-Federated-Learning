import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function RegionalShare() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center xl:justify-start xl:ml-96">
        <div className="flex flex-col gap-4 relative justify-center items-center xl:justify-start xl:items-start">
          <h1 className="md:text-5xl text-2xl font-medium">Regional Share</h1>
          <h1 className="md:text-4xl text-xl font-medium text-muted-foreground text-center">
            North America at 33% in 2023, driven by
          </h1>
          <h1 className="md:text-4xl text-xl font-medium text-muted-foreground text-center">
            government regulatory efforts and tech giants
          </h1>
          <Image
            src="/icons/globe_showing_americas_3d.png"
            width={60}
            height={60}
            alt="Globe Americas"
            className="xl:absolute left-[22rem] -top-2"
          />
        </div>
      </div>
    </CarouselItem>
  );
}
