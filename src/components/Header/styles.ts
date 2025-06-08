import { StyleSheet } from "react-native";
import { fontSizes } from "../../styles/default/fontSizes";

export const HeaderStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 4,
  },
  headerBackButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: 40,
    height: 60,
  },
  headerButtonLabel: {
    color: "#ffffff",
    fontSize: fontSizes["small-12"],
    textAlign: "center",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
