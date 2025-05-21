import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  adContainer: {
    position: "absolute",
    bottom: height * 0.084,
    width: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
