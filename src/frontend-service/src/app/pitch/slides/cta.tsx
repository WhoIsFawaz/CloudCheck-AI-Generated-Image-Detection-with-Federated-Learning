import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { Cloud } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center gap-8">
        <Cloud className="w-12 h-12" />
        <h1 className="text-2xl md:text-5xl font-medium text-center max-w-2xl">
          Detect the undetectable. Trust every pixel.
        </h1>
        <Link href={process.env.NEXT_PUBLIC_FRONTEND_APP_URL ?? "/"}>
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </CarouselItem>
  );
}
