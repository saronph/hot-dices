import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Task, Local } from '../../constants/Phrases';
import { DiceGameStyles as styles } from './styles';

const DiceGame = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<{ task: string; local: string } | null>(null);
  const [currentTask, setCurrentTask] = useState(Task[0]);
  const [currentLocal, setCurrentLocal] = useState(Local[0]);
  const [noRepeat, setNoRepeat] = useState(false);
  const [usedTasks, setUsedTasks] = useState<string[]>([]);
  const [usedLocals, setUsedLocals] = useState<string[]>([]);
  
  const spinValue1 = useRef(new Animated.Value(0)).current;
  const spinValue2 = useRef(new Animated.Value(0)).current;
  const bounceValue1 = useRef(new Animated.Value(0)).current;
  const bounceValue2 = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Reset used items when noRepeat is toggled
  useEffect(() => {
    if (noRepeat) {
      setUsedTasks([]);
      setUsedLocals([]);
    }
  }, [noRepeat]);

  const getRandomIndex = (array: string[], usedItems: string[]) => {
    if (!noRepeat) {
      return Math.floor(Math.random() * array.length);
    }

    const availableItems = array.filter(item => !usedItems.includes(item));
    
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
      
      const taskIndex = getRandomIndex(Task, usedTasks);
      const localIndex = getRandomIndex(Local, usedLocals);

      if (taskIndex === -1 || localIndex === -1) {
        // Reset used items if all have been used
        setUsedTasks([]);
        setUsedLocals([]);
        setCurrentTask(Task[0]);
        setCurrentLocal(Local[0]);
        setResult({
          task: Task[0],
          local: Local[0],
        });
      } else {
        const newTask = Task[taskIndex];
        const newLocal = Local[localIndex];
        
        if (noRepeat) {
          setUsedTasks(prev => [...prev, newTask]);
          setUsedLocals(prev => [...prev, newLocal]);
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
    outputRange: ['0deg', '360deg'],
  });

  const spin2 = spinValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const bounce1 = bounceValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const bounce2 = bounceValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
    <LinearGradient
      colors={['#1a0000', '#330000', '#1a0000']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>{noRepeat ? 'Não Repetir' : 'Repetir'}</Text>
          <TouchableOpacity
            style={[styles.toggleSwitch, noRepeat && styles.toggleSwitchActive]}
            onPress={toggleNoRepeat}
          >
            <Animated.View
              style={[
                styles.toggleKnob,
                noRepeat && styles.toggleKnobActive,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.diceContainer}>
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
          <LinearGradient
            colors={['#ffffff', '#fff0f0']}
            style={styles.diceFace}
          >
            <Text style={styles.diceText}>
              {currentTask}
            </Text>
          </LinearGradient>
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
          <LinearGradient
            colors={['#ffffff', '#fff0f0']}
            style={styles.diceFace}
          >
            <Text style={styles.diceText}>
              {currentLocal}
            </Text>
          </LinearGradient>
        </Animated.View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isRolling && styles.buttonDisabled]}
          onPress={handleRoll}
          disabled={isRolling}
        >
          <LinearGradient
            colors={['#ff0000', '#cc0000']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {isRolling ? 'Rolando...' : 'Rolar Dados'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};



export default DiceGame; 