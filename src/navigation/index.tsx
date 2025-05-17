import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard } from "../screens/Dashboard";
import { DiceGame } from "../screens/DiceGame";

export type RootStackParamList = {
  Dashboard: undefined;
  DiceGame: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#1a1a1a" },
        }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="DiceGame" component={DiceGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
