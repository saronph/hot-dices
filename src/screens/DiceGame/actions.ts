import { PLAY_STORE_URL, PLAY_STORE_URL_SHORT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StoreReview from "expo-store-review";
import { t } from "i18next";
import { Linking, Share } from "react-native";

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

export const handleRate = async () => {
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

export const handleShare = async () => {
  try {
    await Share.share({
      message: `${t("shareAppMessage")}\n${PLAY_STORE_URL_SHORT}`,
      title: t("shareApp"),
    });
  } catch (error) {
    console.error("Error sharing:", error);
  }
};
