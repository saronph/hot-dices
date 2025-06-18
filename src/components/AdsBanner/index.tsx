import { View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { ADS_TEST_ID } from "@env";
import { styles } from "./styles";

export const AdsBanner = () => {
  return (
    <View style={styles.adContainer}>
      <BannerAd
        unitId={ADS_TEST_ID}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};
