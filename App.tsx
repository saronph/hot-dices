import { I18nextProvider } from "react-i18next";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import i18n from "./src/lib/i18n";
import { StatusBar } from "react-native";
import { Navigation } from "./src/navigation";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";
import { useEffect } from "react";
import { AdsBanner } from "./src/components/AdsBanner";

export default function App() {
  useEffect(() => {
    const initializeAds = async () => {
      try {
        await mobileAds().setRequestConfiguration({
          // Update all future requests suitable for parental guidance
          maxAdContentRating: MaxAdContentRating.PG,
          // Indicates that you want your content treated as child-directed for purposes of COPPA.
          tagForChildDirectedTreatment: true,
          // Indicates that you want the ad request to be handled in a
          // manner suitable for users under the age of consent.
          tagForUnderAgeOfConsent: true,
        });

        await mobileAds().initialize();
        console.log("Mobile Ads SDK initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Mobile Ads SDK:", error);
      }
    };

    initializeAds();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#1a1a1a" }}
        edges={["top"]}
      >
        <I18nextProvider i18n={i18n}>
          <StatusBar
            barStyle="light-content"
            translucent={false}
            backgroundColor="#1a1a1a"
          />
          <Navigation />
        </I18nextProvider>

        <AdsBanner />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
