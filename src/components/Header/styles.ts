import { StyleSheet } from "react-native";
import { fontSizes } from "../../styles/default/fontSizes";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../../styles/default/colors";

export const HeaderStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: moderateScale(4),
  },
  headerBackButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: moderateScale(40),
    height: moderateScale(60),
  },
  headerButtonLabel: {
    color: colors["white"],
    fontSize: fontSizes["small-12"],
    textAlign: "center",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
