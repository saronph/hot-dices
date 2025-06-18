import { useState, useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { useTranslation } from "react-i18next";

interface DiceGameResult {
  task: string;
  local: string;
}

export const useDiceGame = () => {
  const { t, i18n } = useTranslation();

  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<DiceGameResult | null>(null);
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
      return -1;
    }

    const randomIndex = Math.floor(Math.random() * availableItems.length);
    return array.indexOf(availableItems[randomIndex]);
  };

  const handleRoll = () => {
    if (isRolling) return;

    setIsRolling(true);
    setResult(null);

    spinValue1.setValue(0);
    spinValue2.setValue(0);
    bounceValue1.setValue(0);
    bounceValue2.setValue(0);
    scaleValue.setValue(1);

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
        setUsedTasks([]);
        setUsedLocals([]);

        const newTaskIndex = Math.floor(Math.random() * tasks.length);
        const newLocalIndex = Math.floor(Math.random() * locations.length);

        const newTask = tasks[newTaskIndex];
        const newLocal = locations[newLocalIndex];

        setCurrentTask(newTask);
        setCurrentLocal(newLocal);
        setResult({
          task: newTask,
          local: newLocal,
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

  useEffect(() => {
    if (noRepeat) {
      setUsedTasks([]);
      setUsedLocals([]);
    }
  }, [noRepeat]);

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

  return {
    isRolling,
    result,
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
  };
};
