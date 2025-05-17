import { StyleSheet } from "react-native";

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
  headerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 60,
  },
  headerButtonContent: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 44,
  },
  headerButtonText: {
    fontSize: 20,
  },
  headerButtonLabel: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
