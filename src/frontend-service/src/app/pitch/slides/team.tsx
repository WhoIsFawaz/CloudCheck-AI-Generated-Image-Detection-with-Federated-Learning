import { CarouselItem } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export default function Team() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-5xl font-medium">Meet the Team</h1>
        </div>

        <ScrollArea className="h-[calc(100vh-20rem)] md:h-full">
          {/* Team Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 md:gap-x-16 gap-y-12 md:gap-y-24">
            {/* Jeung Hong */}
            <div className="text-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
                <Image
                  src="/teampics/jeunghong.png"
                  alt="Jeung Hong Tay"
                  fill
                  className="rounded-full object-cover"
                  sizes="(max-width: 768px) 128px, 192px"
                  priority
                />
              </div>
              <h2 className="text-xl md:text-2xl font-medium mt-4 underline">
                Jeung Hong
              </h2>
              <h2 className="text-lg md:text-xl font-medium">Tay</h2>
            </div>

            {/* Gary */}
            <div className="text-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
                <Image
                  src="/teampics/gary.png"
                  alt="Gary Goh"
                  fill
                  className="rounded-full object-cover"
                  sizes="(max-width: 768px) 128px, 192px"
                />
              </div>
              <h2 className="text-xl md:text-2xl font-medium mt-4 underline">
                Gary
              </h2>
              <h2 className="text-lg md:text-xl font-medium">Goh</h2>
            </div>

            {/* Vignesh */}
            <div className="text-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
                <Image
                  src="/teampics/vignesh.png"
                  alt="Vignesh Kumar"
                  fill
                  className="rounded-full object-cover"
                  sizes="(max-width: 768px) 128px, 192px"
                />
              </div>
              <h2 className="text-xl md:text-2xl font-medium mt-4 underline">
                Vignesh
              </h2>
              <h2 className="text-lg md:text-xl font-medium">Kumar</h2>
            </div>

            {/* Liang Fan */}
            <div className="text-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
                <Image
                  src="/teampics/lf.png"
                  alt="Liang Fan Lim"
                  fill
                  className="rounded-full object-cover"
                  sizes="(max-width: 768px) 128px, 192px"
                />
              </div>
              <h2 className="text-xl md:text-2xl font-medium mt-4 underline">
                Liang Fan
              </h2>
              <h2 className="text-lg md:text-xl font-medium">Lim</h2>
            </div>

            {/* Jia Wei */}
            <div className="text-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
                <Image
                  src="/teampics/jiawei.png"
                  alt="Jia Wei Ng"
                  fill
                  className="rounded-full object-cover"
                  sizes="(max-width: 768px) 128px, 192px"
                />
              </div>
              <h2 className="text-xl md:text-2xl font-medium mt-4 underline">
                Jia Wei
              </h2>
              <h2 className="text-lg md:text-xl font-medium">Ng</h2>
            </div>

            {/* Fawaz */}
            <div className="text-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
                <Image
                  src="/teampics/fawaz.png"
                  alt="Fawaz Mohamed"
                  fill
                  className="rounded-full object-cover"
                  sizes="(max-width: 768px) 128px, 192px"
                />
              </div>
              <h2 className="text-xl md:text-2xl font-medium mt-4 underline">
                Fawaz
              </h2>
              <h2 className="text-lg md:text-xl font-medium">Mohamed</h2>
            </div>
          </div>
        </ScrollArea>
      </div>
    </CarouselItem>
  );
}
