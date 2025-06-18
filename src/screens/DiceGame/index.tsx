import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useTranslation } from "react-i18next";
import { FontAwesome6 } from "@expo/vector-icons";

import { DiceGameStyles as styles } from "./styles";
import { Header } from "../../components/Header";
import { HeaderButton } from "../../components/HeaderButton";
import { colors } from "../../styles/default/colors";
import { useDiceGame } from "../../hooks";

const DiceGame = () => {
  const { t } = useTranslation();
  const {
    isRolling,
    currentTask,
    currentLocal,
    noRepeat,
    handleRoll,
    toggleNoRepeat,
    spin1,
    spin2,
    bounce1,
    bounce2,
    scaleValue,
  } = useDiceGame();

  return (
    <View style={styles.container}>
      <Header>
        <HeaderButton onPress={toggleNoRepeat}>
          <FontAwesome6
            name={noRepeat ? "toggle-on" : "toggle-off"}
            size={24}
            color={noRepeat ? colors["red-600"] : colors["gray-500"]}
          />
          <Text style={styles.headerButtonLabel}>
            {noRepeat ? t("noRepeat") : t("repeat")}
          </Text>
        </HeaderButton>
      </Header>

      <View style={styles.diceContainer}>
        <View style={styles.diceAlign}>
          <Animated.View
            style={[
              styles.dice,
              {
                transform: [
                  { rotate: spin1 },
                  { translateY: bounce1 },
                  { scale: scaleValue },
                ],
              },
            ]}
          >
            <Text style={styles.diceText}>{isRolling ? "?" : currentTask}</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.dice,
              {
                transform: [
                  { rotate: spin2 },
                  { translateY: bounce2 },
                  { scale: scaleValue },
                ],
              },
            ]}
          >
            <Text style={styles.diceText}>
              {isRolling ? "?" : currentLocal}
            </Text>
          </Animated.View>
        </View>

        <TouchableOpacity
          style={[styles.button, isRolling && styles.buttonDisabled]}
          onPress={handleRoll}
          disabled={isRolling}
        >
          <Text style={styles.buttonText}>
            {isRolling ? t("rolling") : t("roll")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { DiceGame };
