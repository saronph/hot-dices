import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/default/colors";
import { fontSizes } from "../../styles/default/fontSizes";
import { moderateScale } from "react-native-size-matters";

const { height } = Dimensions.get("window");

export const DiceGameStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["background-screens"],
  },
  headerButtonLabel: {
    color: colors.white,
    fontSize: fontSizes["small-12"],
    textAlign: "center",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  diceContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: moderateScale(24),
    paddingTop: moderateScale(80),
  },
  diceAlign: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(40),
  },
  dice: {
    borderWidth: 2,
    borderColor: colors["red-600"],
    backgroundColor: colors["white-200"],
    borderRadius: moderateScale(20),
    elevation: 8,
    height: moderateScale(120),
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    padding: moderateScale(8),
    width: moderateScale(120),
  },
  diceText: {
    fontSize: fontSizes["medium-16"],
    fontWeight: "bold",
    color: colors["red-600"],
    textAlign: "center",
    lineHeight: moderateScale(20),
    width: "100%",
  },
  button: {
    borderRadius: moderateScale(25),
    elevation: 5,
    borderWidth: 2,
    borderColor: colors.white,
    width: moderateScale(200),
    paddingHorizontal: moderateScale(40),
    paddingVertical: moderateScale(15),
    backgroundColor: colors["red-500"],
  },
  buttonDisabled: {
    backgroundColor: colors["disabled-button"],
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes["medium-16"],
    fontWeight: "bold",
    textAlign: "center",
  },
});
