"use client";

import ImageClassifier from "./image-classifier";

export default function ImageCheckerPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Image Checker</h1>
        <p className="text-muted-foreground mt-2">
          Upload an image to check if it&apos;s real or AI-generated
        </p>
      </div>

      <ImageClassifier />
    </div>
  );
}
