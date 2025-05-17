import { I18nextProvider } from "react-i18next";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import i18n from "./src/lib/i18n";
import { StatusBar } from "react-native";
import { Navigation } from "./src/navigation";

export default function App() {
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
          <Navigation />
        </I18nextProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
