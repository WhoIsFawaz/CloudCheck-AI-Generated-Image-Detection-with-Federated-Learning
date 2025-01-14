import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function RevenueProjection() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center xl:justify-start xl:ml-96">
        <div className="flex flex-col gap-4 relative justify-center items-center xl:justify-start xl:items-start">
          <h1 className="md:text-5xl text-2xl font-medium">
            Revenue Projection Per Application
          </h1>
          <h1 className="md:text-4xl text-xl font-medium text-muted-foreground text-center">
            1-5% of the total market, potential revenue of
          </h1>
          <h1 className="md:text-4xl text-xl font-medium text-muted-foreground text-center">
            $30 million - $150 million annually
          </h1>
          <Image
            src="/icons/coin_3d.png"
            width={60}
            height={60}
            alt="Coin"
            className="xl:absolute left-[50rem] -top-2"
          />
        </div>
      </div>
    </CarouselItem>
  );
}
