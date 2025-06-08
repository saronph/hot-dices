import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/default/colors";
import { fontSizes } from "../../styles/default/fontSizes";

const { height } = Dimensions.get("window");

export const DashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["background-screens"],
    alignItems: "center",
    paddingTop: height * 0.067,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: fontSizes["xxlarge-40"],
    fontWeight: "bold",
    color: colors.white,
    marginBottom: height * 0.05,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: height * 0.033,
  },
  button: {
    backgroundColor: colors["red-500"],
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
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
    minHeight: height * 0.01,
  },
  comingSoonButton: {
    backgroundColor: colors["disabled-button"],
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes["large-24"],
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonDescription: {
    color: colors.white,
    fontSize: fontSizes["medium-16"],
    textAlign: "center",
    opacity: 0.9,
    paddingHorizontal: 20,
  },
});
