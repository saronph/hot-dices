import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { t } from "i18next";
import { RootStackParamList } from "../../navigation";
import { DashboardStyles as styles } from "./styles";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";
import { showInterstitialAd } from "../../lib/ads";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Dashboard = () => {
  const navigation = useNavigation<NavigationProp>();
  const { i18n } = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      i18n.changeLanguage(i18n.language);
    }, [i18n])
  );

  const handleNavigateRollDice = async () => {
    await showInterstitialAd();
    navigation.navigate("DiceGame");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hot Dices</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateRollDice}
        >
          <Text style={styles.buttonText}>{t("roll")}</Text>
          <Text style={styles.buttonDescription}>
            {t("diceGameDescription")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.comingSoonButton]}
          disabled={true}
        >
          <Text style={styles.buttonText}>{t("comingSoon")}</Text>
          <Text style={styles.buttonDescription}>
            {t("newFeatureDescription")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
