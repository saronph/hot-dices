import React, { useEffect } from "react";
import { AppProviders } from "./src/providers/AppProviders";
import { Navigation } from "./src/navigation";
import { AdsBanner } from "./src/components/AdsBanner";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";

export default function App() {
  useEffect(() => {
    const initializeAds = async () => {
      try {
        await mobileAds().setRequestConfiguration({
          maxAdContentRating: MaxAdContentRating.PG,
          tagForChildDirectedTreatment: true,
          tagForUnderAgeOfConsent: true,
        });

        await mobileAds().initialize();
      } catch (error) {}
    };

    initializeAds();
  }, []);

  return (
    <AppProviders>
      <Navigation />
      <AdsBanner />
    </AppProviders>
  );
}
