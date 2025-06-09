import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/default/colors";
import { fontSizes } from "../../styles/default/fontSizes";
import { moderateScale } from "react-native-size-matters";

const { height } = Dimensions.get("window");

export const DashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["background-screens"],
    alignItems: "center",
    paddingTop: moderateScale(40),
    paddingHorizontal: moderateScale(24),
  },
  title: {
    fontSize: fontSizes["xxlarge-40"],
    fontWeight: "bold",
    color: colors.white,
    marginBottom: moderateScale(24),
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: moderateScale(16),
  },
  button: {
    minHeight: moderateScale(100),
    backgroundColor: colors["red-500"],
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  comingSoonButton: {
    backgroundColor: colors["disabled-button"],
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes["large-24"],
    fontWeight: "bold",
    marginBottom: moderateScale(8),
  },
  buttonDescription: {
    color: colors.white,
    fontSize: fontSizes["medium-16"],
    textAlign: "center",
    opacity: 0.9,
    paddingHorizontal: moderateScale(20),
  },
});
