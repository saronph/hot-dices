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
      console.error("Erro ao incrementar tentativas:", error);
      return 0;
    }
  };

  const handleRate = async () => {
    try {
      // Verifica se a funcionalidade está disponível na plataforma
      const isAvailable = await StoreReview.isAvailableAsync();

      if (isAvailable) {
        // Verifica se há uma ação de review disponível
        const hasAction = await StoreReview.hasAction();

        if (hasAction) {
          // Solicita a review nativa
          await StoreReview.requestReview();

          // Incrementa o contador de tentativas
          const attempts = await incrementReviewAttempts();

          // Se já tentou 2 vezes, redireciona para a loja
          if (attempts >= 2) {
            const storeUrl = StoreReview.storeUrl() || PLAY_STORE_URL;
            await Linking.openURL(storeUrl);
          }
        } else {
          // Fallback: abre a loja de aplicativos
          const storeUrl = StoreReview.storeUrl();

          if (storeUrl) {
            await Linking.openURL(storeUrl);
          } else {
            await Linking.openURL(PLAY_STORE_URL);
          }
        }
      } else {
        // Fallback para dispositivos não suportados
        await Linking.openURL(PLAY_STORE_URL);
      }
    } catch (error) {
      console.error("Erro detalhado ao solicitar review:", error);
      // Fallback em caso de erro
      try {
        await Linking.openURL(PLAY_STORE_URL);
      } catch (fallbackError) {
        console.error("Erro detalhado ao abrir loja:", fallbackError);
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
      console.error("Error sharing:", error);
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerBackButton}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="rgba(255, 255, 255, 0.2)"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
        <View style={styles.headerButtonContent}>
          <Feather name="share-2" size={24} color="rgba(255, 255, 255, 0.2)" />
          <Text style={styles.headerButtonLabel}>{t("shareApp")}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRate} style={styles.headerButton}>
        <View style={styles.headerButtonContent}>
          <FontAwesome6
            name="star"
            size={24}
            color="rgba(255, 255, 255, 0.2)"
          />
          <Text style={styles.headerButtonLabel}>{t("rateApp")}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRate} style={styles.headerButton}>
        <View style={styles.headerButtonContent}>
          <LanguageSelector />
        </View>
      </TouchableOpacity>

      {children}
    </View>
  );
};
