import ImageClassifier from "@/app/dashboard/image-checker/image-classifier";
import { Card } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";

export default function ImageClassifierSlide() {
  return (
    <CarouselItem>
      <Card className="flex h-screen w-full flex-col items-center justify-center bg-transparent border-none">
        <div className="xl:w-1/3 w-full px-10 mx-auto space-y-6">
          <div>
            <ImageClassifier />
          </div>
          <h2 className="md:text-2xl text-lg font-medium mb-12 text-center text-foreground">
            Image Checker
          </h2>
        </div>
      </Card>
    </CarouselItem>
  );
}
