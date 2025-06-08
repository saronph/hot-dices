import React from "react";
import { I18nextProvider } from "react-i18next";
import { NavigationContainer } from "@react-navigation/native";
import i18n from "../lib/i18n";

type Props = {
  children: React.ReactNode;
};

export function TestProviders({ children }: Props) {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>{children}</NavigationContainer>
    </I18nextProvider>
  );
}
