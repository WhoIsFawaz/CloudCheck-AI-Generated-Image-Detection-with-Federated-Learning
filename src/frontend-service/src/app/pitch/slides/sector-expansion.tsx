import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function SectorExpansion() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center xl:justify-start xl:ml-96">
        <div className="flex flex-col gap-4 relative justify-center items-center xl:justify-start xl:items-start">
          <h1 className="md:text-5xl text-2xl font-medium">Sector Expansion</h1>
          <h1 className="md:text-4xl text-xl font-medium text-muted-foreground text-center">
            Demand rising in E-commerce, National Security, Media
          </h1>
          <Image
            src="/icons/chart_increasing_3d.png"
            width={60}
            height={60}
            alt="Chart Rising"
            className="xl:absolute left-[25rem] -top-2"
          />
        </div>
      </div>
    </CarouselItem>
  );
}
