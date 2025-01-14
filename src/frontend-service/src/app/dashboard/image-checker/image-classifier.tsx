"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import ImageClassifierService from "@/services/image-checker-service";
import { ThumbsDown, ThumbsUp, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function ImageClassifier() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [classificationResult, setClassificationResult] = useState<
    string | null
  >(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [isTrainingModel, setIsTrainingModel] = useState(false);
  const [updatedClassification, setUpdatedClassification] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setSelectedImage(file);
      setClassificationResult(null);
      setUpdatedClassification(false);
    }
  };

  const classifyImage = async () => {
    if (selectedImage) {
      setIsClassifying(true);
      try {
        const result = await ImageClassifierService.classify_image(
          selectedImage,
          0
        );
        const resultText = result === 0 ? "Fake" : "Real";
        setClassificationResult(resultText);
        toast.success(`Image classified as: ${resultText}`);
      } catch (error) {
        console.error("Error classifying image:", error);
        setClassificationResult("Error occurred during classification");
        toast.error("Failed to classify image");
      } finally {
        setIsClassifying(false);
      }
    }
  };

  const acceptClassification = async () => {
    setIsTrainingModel(true);

    try {
      if (selectedImage) {
        await ImageClassifierService.train_model(
          selectedImage,
          classificationResult === "Real" ? 1 : 0
        );
        await ImageClassifierService.upload_model();
        setClassificationResult(`${classificationResult} (Accepted)`);
        toast.success("Your feedback has been recorded");
        setUpdatedClassification(true);
      }
    } catch (error) {
      console.error("Error accepting classification:", error);
      toast.error("Failed to process feedback");
    } finally {
      setIsTrainingModel(false);
    }
  };

  const disputeClassification = async () => {
    setOpenDialog(false);
    setIsTrainingModel(true);

    try {
      if (selectedImage) {
        await ImageClassifierService.train_model(
          selectedImage,
          classificationResult === "Real" ? 0 : 1
        );
        await ImageClassifierService.upload_model();
        setClassificationResult(`${classificationResult} (Disputed)`);
        toast.success("Your feedback has been recorded");
        setUpdatedClassification(true);
      }
    } catch (error) {
      console.error("Error disputing classification:", error);
      toast.error("Failed to process dispute");
    } finally {
      setIsTrainingModel(false);
    }
  };

  useEffect(() => {
    async function prepareModel() {
      try {
        await ImageClassifierService.prepare_ml();
        toast.success("Image checker is ready");
      } catch (error) {
        console.error("Error loading models", error);
        toast.error("Failed to load image checker model");
      } finally {
        setIsModelLoading(false);
      }
    }

    prepareModel();

    return () => {
      ImageClassifierService.dispose_models();
    };
  }, []);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Classify Image</CardTitle>
        </CardHeader>
        <CardContent>
          {isModelLoading ? (
            <div className="text-center py-8">
              <Progress value={30} className="w-[60%] mx-auto mb-4" />
              <p className="text-muted-foreground">Loading Image Checker...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div>
                {selectedImage && (
                  <Button
                    onClick={classifyImage}
                    disabled={isClassifying || isTrainingModel}
                    className="relative me-2"
                  >
                    {isClassifying ? "Checking..." : "Check Image"}
                    {!classificationResult && (
                      <span className="absolute top-1/6 right-1/6 h-4/6 w-4/6 bg-blue-500 rounded-md opacity-50 animate-ping z-0" />
                    )}
                  </Button>
                )}
                <Button
                  onClick={() => inputRef.current?.click()}
                  variant="outline"
                >
                  Choose Image
                </Button>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                className="hidden"
                ref={inputRef}
              />
              <div
                className={`group relative grid h-96 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-5 text-center transition hover:bg-muted/25 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${!selectedImage ? "bg-muted" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => inputRef.current?.click()}
              >
                {selectedImage ? (
                  <div className="my-4 gap-2 flex flex-col w-full h-full rounded-md">
                    <div className="relative w-full h-full rounded-md">
                      <Image
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected Image"
                        fill
                        className="object-contain"
                      />
                    </div>
                    {/* <p className="text-sm text-muted-foreground/70">
                      Drag {`'n'`} drop an image here, or click to change image
                    </p> */}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                    <div className="rounded-full border border-dashed p-3">
                      <Upload
                        className="size-7 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex flex-col gap-px">
                      <p className="font-medium text-muted-foreground">
                        Drag {`'n'`} drop an image here, or click to select
                        image
                      </p>
                      <p className="text-sm text-muted-foreground/70">
                        You can upload an image with 5 MB.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {classificationResult && (
                <div className="mt-4 space-y-4 flex flex-col items-center">
                  <p className="text-xl font-semibold leading-none tracking-tight">
                    Classification Result
                  </p>
                  <p
                    className={`text-4xl text-center font-bold m-0 ${classificationResult === "Real" || classificationResult === "Real (Accepted)" ? "text-green-600" : "text-red-600"}`}
                  >
                    {classificationResult}
                  </p>

                  {!updatedClassification && (
                    <>
                      <p className="text-lg mt-4">
                        Was this prediction accurate?
                      </p>
                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          onClick={acceptClassification}
                          disabled={isTrainingModel}
                        >
                          <ThumbsUp className="mr-2 h-5 w-5" /> Yes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setOpenDialog(true)}
                          disabled={isTrainingModel}
                        >
                          <ThumbsDown className="mr-2 h-5 w-5" /> No
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dispute Classification</DialogTitle>
            <DialogDescription>
              Our system has detected that the image is{" "}
              {classificationResult?.toLowerCase()}. Do you want to dispute this
              classification?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={disputeClassification}>
              Dispute as {classificationResult === "Real" ? "fake" : "real"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
