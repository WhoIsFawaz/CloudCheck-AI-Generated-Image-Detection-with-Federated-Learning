import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function MarketGrowth() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center xl:justify-start xl:ml-96">
        <div className="flex flex-col gap-4 relative justify-center items-center xl:justify-start xl:items-start">
          <h1 className="md:text-5xl text-2xl font-medium">
            Gen-AI Detection Market Growth
          </h1>
          <h1 className="md:text-4xl text-xl font-medium text-muted-foreground text-center">
            $3B+ projected by 2032, 70% is cloud-based solution
          </h1>
          <Image
            src="/icons/magnifying_glass_tilted_right_3d.png"
            width={60}
            height={60}
            alt="Magnifying Glass"
            className="xl:absolute left-[46rem] -top-2"
          />
        </div>
      </div>
    </CarouselItem>
  );
}
