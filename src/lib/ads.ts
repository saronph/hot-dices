import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from "react-native-google-mobile-ads";

const LAST_AD_SHOWN_KEY = "@hot_dices:last_ad_shown";
const THREE_HOURS_IN_MS = 3 * 60 * 60 * 1000;

// const adUnitId = __DEV__
//   ? TestIds.INTERSTITIAL
//   : "ca-app-pub-3940256099942544/1033173712"; // Replace with your production ad unit ID

const adUnitId = TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export const showInterstitialAd = async (): Promise<boolean> => {
  try {
    const lastAdShown = await AsyncStorage.getItem(LAST_AD_SHOWN_KEY);
    const now = Date.now();

    if (lastAdShown) {
      const timeSinceLastAd = now - parseInt(lastAdShown);
      if (timeSinceLastAd < THREE_HOURS_IN_MS) {
        return false;
      }
    }

    return new Promise((resolve) => {
      const unsubscribeLoaded = interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
          interstitial.show();
        }
      );

      const unsubscribeClosed = interstitial.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          AsyncStorage.setItem(LAST_AD_SHOWN_KEY, now.toString());
          unsubscribeLoaded();
          unsubscribeClosed();
          resolve(true);
        }
      );

      const unsubscribeError = interstitial.addAdEventListener(
        AdEventType.ERROR,
        () => {
          unsubscribeLoaded();
          unsubscribeClosed();
          unsubscribeError();
          resolve(false);
        }
      );

      interstitial.load();
    });
  } catch (error) {
    return false;
  }
};
