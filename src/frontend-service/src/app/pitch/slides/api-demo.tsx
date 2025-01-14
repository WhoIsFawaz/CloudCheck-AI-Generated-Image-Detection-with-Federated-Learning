import { Card } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";

export default function APIDemo() {
  return (
    <CarouselItem>
      <Card className="flex h-screen w-full flex-col items-center justify-center bg-transparent border-none">
        <div className="w-full max-w-7xl mx-auto space-y-6">
          <div className="relative w-full pb-[150%] md:pb-[53%]">
            <iframe
              src={`${process.env.NEXT_PUBLIC_FRONTEND_APP_URL}/dashboard/api`}
              className="absolute top-0 left-0 w-full h-full rounded-xl"
            />
          </div>
          {/* <h2 className="md:text-2xl text-lg font-medium mb-12 text-center text-foreground">
            API Dashboard
          </h2> */}
        </div>
      </Card>
    </CarouselItem>
  );
}
