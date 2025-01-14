import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function APIVolumeDiscount() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center xl:justify-start xl:ml-96">
        <div className="flex flex-col gap-4 relative justify-center items-center xl:justify-start xl:items-start">
          <h1 className="md:text-5xl text-2xl font-medium">
            API volume discounts available
          </h1>
          <Image
            src="/icons/money_bag_3d.png"
            width={60}
            height={60}
            alt="Money Bag"
            className="xl:absolute left-[44rem] -top-2"
          />
        </div>
      </div>
    </CarouselItem>
  );
}
