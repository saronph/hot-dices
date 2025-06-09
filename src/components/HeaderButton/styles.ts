import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  headerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: moderateScale(60),
  },
  headerButtonContent: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: moderateScale(44),
  },
});
