import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { useTranslation } from "react-i18next";
import { FontAwesome6 } from "@expo/vector-icons";

import { DiceGameStyles as styles } from "./styles";
import { Header } from "../../components/Header";
import { HeaderButton } from "../../components/HeaderButton";
import { colors } from "../../styles/default/colors";

const DiceGame = () => {
  const { t, i18n } = useTranslation();
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<{ task: string; local: string } | null>(
    null
  );
  const [currentTask, setCurrentTask] = useState(t("tasks.0"));
  const [currentLocal, setCurrentLocal] = useState(t("locations.0"));
  const [noRepeat, setNoRepeat] = useState(false);
  const [usedTasks, setUsedTasks] = useState<string[]>([]);
  const [usedLocals, setUsedLocals] = useState<string[]>([]);

  const spinValue1 = useRef(new Animated.Value(0)).current;
  const spinValue2 = useRef(new Animated.Value(0)).current;
  const bounceValue1 = useRef(new Animated.Value(0)).current;
  const bounceValue2 = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const getRandomIndex = (array: string[], usedItems: string[]) => {
    if (!noRepeat) {
      return Math.floor(Math.random() * array.length);
    }

    const availableItems = array.filter((item) => !usedItems.includes(item));

    if (availableItems.length === 0) {
      return -1; // Todos os itens já foram usados
    }

    const randomIndex = Math.floor(Math.random() * availableItems.length);
    return array.indexOf(availableItems[randomIndex]);
  };

  const handleRoll = () => {
    if (isRolling) return;

    setIsRolling(true);
    setResult(null);

    // Reset animation values
    spinValue1.setValue(0);
    spinValue2.setValue(0);
    bounceValue1.setValue(0);
    bounceValue2.setValue(0);
    scaleValue.setValue(1);

    // Create spinning and bouncing animations
    Animated.parallel([
      Animated.sequence([
        Animated.timing(spinValue1, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue1, {
          toValue: 1,
          duration: 500,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(spinValue2, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue2, {
          toValue: 1,
          duration: 500,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setIsRolling(false);

      const tasks = Array.from({ length: 6 }, (_, i) => t(`tasks.${i}`));
      const locations = Array.from({ length: 6 }, (_, i) =>
        t(`locations.${i}`)
      );

      const taskIndex = getRandomIndex(tasks, usedTasks);
      const localIndex = getRandomIndex(locations, usedLocals);

      if (taskIndex === -1 || localIndex === -1) {
        // Reset used items if all have been used
        setUsedTasks([]);
        setUsedLocals([]);
        setCurrentTask(tasks[0]);
        setCurrentLocal(locations[0]);
        setResult({
          task: tasks[0],
          local: locations[0],
        });
      } else {
        const newTask = tasks[taskIndex];
        const newLocal = locations[localIndex];

        if (noRepeat) {
          setUsedTasks((prev) => [...prev, newTask]);
          setUsedLocals((prev) => [...prev, newLocal]);
        }

        setCurrentTask(newTask);
        setCurrentLocal(newLocal);
        setResult({
          task: newTask,
          local: newLocal,
        });
      }
    });
  };

  const toggleNoRepeat = () => {
    setNoRepeat(!noRepeat);
  };

  const spin1 = spinValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spin2 = spinValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const bounce1 = bounceValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const bounce2 = bounceValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  // Reset used items when noRepeat is toggled
  useEffect(() => {
    if (noRepeat) {
      setUsedTasks([]);
      setUsedLocals([]);
    }
  }, [noRepeat]);

  // Update texts when language changes
  useEffect(() => {
    const tasks = Array.from({ length: 6 }, (_, i) => t(`tasks.${i}`));
    const locations = Array.from({ length: 6 }, (_, i) => t(`locations.${i}`));

    if (result) {
      const taskIndex = tasks.findIndex((task) => task === currentTask);
      const localIndex = locations.findIndex(
        (location) => location === currentLocal
      );

      setCurrentTask(tasks[taskIndex >= 0 ? taskIndex : 0]);
      setCurrentLocal(locations[localIndex >= 0 ? localIndex : 0]);
    } else {
      setCurrentTask(tasks[0]);
      setCurrentLocal(locations[0]);
    }
  }, [i18n.language]);

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
