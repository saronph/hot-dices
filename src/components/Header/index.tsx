import { Linking, Share, Text, View } from "react-native";

import { TouchableOpacity } from "react-native";
import { HeaderStyles as styles } from "./styles";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { PLAY_STORE_URL, PLAY_STORE_URL_SHORT } from "@env";
import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import LanguageSelector from "../LanguageSelector";
import { HeaderButton } from "../HeaderButton";
import { colors } from "../../styles/default/colors";

interface HeaderProps {
  children: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const REVIEW_ATTEMPTS_KEY = "@hotdices:review_attempts";

  const incrementReviewAttempts = async () => {
    try {
      const attempts = await AsyncStorage.getItem(REVIEW_ATTEMPTS_KEY);
      const newAttempts = (parseInt(attempts || "0") + 1).toString();
      await AsyncStorage.setItem(REVIEW_ATTEMPTS_KEY, newAttempts);
      return parseInt(newAttempts);
    } catch (error) {
      return 0;
    }
  };

  const handleRate = async () => {
    try {
      const isAvailable = await StoreReview.isAvailableAsync();

      if (isAvailable) {
        const hasAction = await StoreReview.hasAction();

        if (hasAction) {
          await StoreReview.requestReview();
          const attempts = await incrementReviewAttempts();

          if (attempts >= 2) {
            const storeUrl = StoreReview.storeUrl() || PLAY_STORE_URL;
            await Linking.openURL(storeUrl);
          }
        } else {
          const storeUrl = StoreReview.storeUrl();

          if (storeUrl) {
            await Linking.openURL(storeUrl);
          } else {
            await Linking.openURL(PLAY_STORE_URL);
          }
        }
      } else {
        await Linking.openURL(PLAY_STORE_URL);
      }
    } catch (error) {
      // Handle review request error silently
      try {
        await Linking.openURL(PLAY_STORE_URL);
      } catch (fallbackError) {
        // Handle store opening error silently
      }
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${t("shareAppMessage")}\n${PLAY_STORE_URL_SHORT}`,
        title: t("shareApp"),
      });
    } catch (error) {
      // Handle sharing error silently
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerBackButton}
      >
        <Ionicons name="arrow-back" size={24} color={colors["gray-500"]} />
      </TouchableOpacity>

      <HeaderButton onPress={handleShare}>
        <Feather name="share-2" size={24} color={colors["gray-500"]} />
        <Text style={styles.headerButtonLabel}>{t("shareApp")}</Text>
      </HeaderButton>

      <HeaderButton onPress={handleRate}>
        <FontAwesome6 name="star" size={24} color={colors["gray-500"]} />
        <Text style={styles.headerButtonLabel}>{t("rateApp")}</Text>
      </HeaderButton>

      <HeaderButton onPress={() => {}}>
        <LanguageSelector />
      </HeaderButton>

      {children}
    </View>
  );
};
