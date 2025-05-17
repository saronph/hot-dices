import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { t } from "i18next";
import { RootStackParamList } from "../../navigation";
import { DashboardStyles as styles } from "./styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Dashboard = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hot Dices</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DiceGame")}
        >
          <Text style={styles.buttonText}>{t("roll")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.comingSoonButton]}
          disabled={true}
        >
          <Text style={styles.buttonText}>{t("comingSoon")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
