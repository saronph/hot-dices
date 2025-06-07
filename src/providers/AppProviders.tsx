import React from "react";
import { I18nextProvider } from "react-i18next";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import i18n from "../lib/i18n";

type Props = {
  children: React.ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#1a1a1a" }}
        edges={["top"]}
      >
        <I18nextProvider i18n={i18n}>
          <StatusBar
            barStyle="light-content"
            translucent={false}
            backgroundColor="#1a1a1a"
          />
          {children}
        </I18nextProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
