"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import SlideToolbar from "./slide-toolbar";
import APIAvailable from "./slides/api-available";
import APICost from "./slides/api-cost";
import APIDemo from "./slides/api-demo";
import APITrainingUsage from "./slides/api-training-usage";
import APIVolumeDiscount from "./slides/api-volume-discount";
import Architecture from "./slides/architecture";
import BusinessModel from "./slides/business-model";
import CTA from "./slides/cta";
import DashboardDemo from "./slides/dashboard-demo";
import EnvoyHeading from "./slides/envoy-heading";
import FederatedLearning from "./slides/federated-learning";
import FederatedLearningHeading from "./slides/federated-learning-heading";
import FinancialProjections from "./slides/financial-projections";
import FreeForPersonalUse from "./slides/free-for-personal-use";
import Functionalities from "./slides/functionalities";
import FunctionalitiesHeading from "./slides/functionalities-heading";
import FutureDevelopments from "./slides/future-developments";
import GoogleMNet from "./slides/google-mnet";
import HowDoesModelUpdate from "./slides/how-does-model-update";
import HybridCloudArchitecture from "./slides/hybrid-cloud-architecture";
import InteractiveDemo from "./slides/interactive-demo";
import Intro from "./slides/intro";
import MarketGrowth from "./slides/market-growth";
import Misinformation from "./slides/misinformation";
import ModelAggregation from "./slides/model-aggregation";
import OurSolution from "./slides/our-solution";
import PMF from "./slides/pmf";
import QRCodeSlide from "./slides/qr-code";
import RegionalShare from "./slides/regional-share";
import RevenueProjection from "./slides/revenue-projection";
import SectorExpansion from "./slides/sector-expansion";
import SubscriptionCost from "./slides/subscription-cost";
import SubscriptionLimits from "./slides/subscription-limits";
import SystemDesign from "./slides/system-design";
import TargetMarket from "./slides/target-market";
import Team from "./slides/team";
import Synopsis from "./slides/synopsis";
import WhatIsCloudCheck from "./slides/whatiscloudcheck";
import WhyCloudCheck from "./slides/whycloudcheck";
import Article from "./slides/article";
import HowImpact from "./slides/howimpact";
import HPA from  "./slides/hpa";
import Envoy from "./slides/envoy";

export default function PitchDeck() {
  const DEMO_SLIDE_NUMBER = 40;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function handleSkipToDemoClick() {
    api?.scrollTo(DEMO_SLIDE_NUMBER);
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <Carousel setApi={setApi} className="h-full w-full">
        <CarouselContent>
          {/* Intro */}
          <Intro onSkipDemoClicked={handleSkipToDemoClick} />
          <Team />
          <Synopsis/>
          <WhatIsCloudCheck />
          <Misinformation />
          <WhyCloudCheck />
          <Article />
          <HowImpact />

          {/* Functionalities */}
          <FunctionalitiesHeading />
          <DashboardDemo />
          <Functionalities />
          <OurSolution />

          {/* Architecture */}
          <SystemDesign />
          <Architecture />
          <HPA />
          <EnvoyHeading />
          <Envoy />
          <FederatedLearningHeading />
          <FederatedLearning />
          <GoogleMNet />
          <HowDoesModelUpdate />
          <ModelAggregation />
          <HybridCloudArchitecture />

          {/* Business */}
          <PMF />
          <TargetMarket />
          <BusinessModel />
          <FreeForPersonalUse />
          {/* <ImageClassifierSlide /> */}
          <SubscriptionLimits />
          <SubscriptionCost />
          <APIAvailable />
          <APIDemo />
          <APICost />
          <APIVolumeDiscount />
          <APITrainingUsage />

          {/* Financials */}
          <FinancialProjections />
          <MarketGrowth />
          <RegionalShare />
          <SectorExpansion />
          <RevenueProjection />
          <FutureDevelopments />

          {/* Ending */}
          <CTA />
          <InteractiveDemo />
          <QRCodeSlide />
        </CarouselContent>
        <SlideToolbar current={current} count={count} />
      </Carousel>
    </div>
  );
}
