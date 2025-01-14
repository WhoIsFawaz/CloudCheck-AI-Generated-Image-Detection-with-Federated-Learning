import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function HalloweenArticle() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-6xl px-10 items-center">
          <div className="relative w-full h-[500px] md:h-[800px]">
            <Image
              src="/img/article.png"
              alt="AI Halloween Article"
              layout="fill"
              objectFit="contain"
              className="dark:invert-[96%]"
            />
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
