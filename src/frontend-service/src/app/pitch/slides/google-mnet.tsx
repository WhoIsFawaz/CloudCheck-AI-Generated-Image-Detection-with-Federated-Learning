import { CarouselItem } from "@/components/ui/carousel";
import { Database, RefreshCcw, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function GoogleMNet() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-6xl px-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative w-full h-[300px] md:h-[500px]">
            <Image
              src="/architecture/google-mnet.png"
              alt="Google Mnet Diagram"
              layout="fill"
              objectFit="contain"
              className="dark:invert-[96%]"
            />
          </div>
          <div className="space-y-8">
            <h3 className="text-xl md:text-3xl flex flex-row gap-4 items-center">
              <RefreshCcw /> Transferred Learning (Bottleneck Layer)
            </h3>
            <h3 className="text-xl md:text-3xl flex flex-row gap-4 items-center">
              <ShieldCheck /> Data Privacy
            </h3>
            <h3 className="text-xl md:text-3xl flex flex-row gap-4 items-center">
              <Database /> Low Storage Requirement
            </h3>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
