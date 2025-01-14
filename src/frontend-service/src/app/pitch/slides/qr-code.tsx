import { CarouselItem } from "@/components/ui/carousel";
import { ScanTextIcon } from "lucide-react";
import QRCode from "react-qr-code";

export default function QRCodeSlide() {
  const pitchUrl = "https://cloudcheckapp.vercel.app/pitch";
  return (
    <CarouselItem>
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <ScanTextIcon />
        <div className="w-48 h-48">
          <QRCode
            value={pitchUrl}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            viewBox={`0 0 256 256`}
            className="dark:invert"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-72">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-muted-foreground">
                OR GO TO YOUR BROWSER
              </span>
            </div>
          </div>
          <a
            href={pitchUrl}
            className="text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {pitchUrl}
          </a>
        </div>
        <p className="text-sm text-muted-foreground mt-12">
          Online app is only for interactive demo & references
        </p>
      </div>
    </CarouselItem>
  );
}
