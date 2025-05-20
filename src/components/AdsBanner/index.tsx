import { View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { styles } from "./styles";

const adUnitId = __DEV__
  ? "ca-app-pub-3940256099942544/6300978111" // Test ID for Android
  : "ca-app-pub-3940256099942544/6300978111"; // Test ID for Android

export const AdsBanner = () => {
  return (
    <View style={styles.adContainer}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};
