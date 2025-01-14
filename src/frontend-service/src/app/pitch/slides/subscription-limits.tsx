import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function SubscriptionLimits() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center xl:justify-start xl:ml-96">
        <div className="flex flex-col gap-4 relative justify-center items-center xl:justify-start xl:items-start">
          <h1 className="md:text-5xl text-2xl font-medium">
            Subscribe for increased limits
          </h1>
          <Image
            src="/icons/upwards_button_3d.png"
            width={60}
            height={60}
            alt="Up Arrow"
            className="xl:absolute left-[43rem] -top-2"
          />
        </div>
      </div>
    </CarouselItem>
  );
}
