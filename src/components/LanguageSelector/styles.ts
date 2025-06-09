import { StyleSheet, Dimensions } from "react-native";
import { fontSizes } from "../../styles/default/fontSizes";
import { colors } from "../../styles/default/colors";
import { moderateScale } from "react-native-size-matters";

export const LanguageSelectorStyles = StyleSheet.create({
  flagContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: moderateScale(44),
  },
  flag: {
    borderRadius: moderateScale(5),
  },
  label: {
    color: colors.white,
    fontSize: fontSizes["small-12"],
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors["modal-overlay"],
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors["white-200"],
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    width: Dimensions.get("window").width * 0.8,
    maxWidth: moderateScale(400),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: moderateScale(16),
  },
  flagButton: {
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: colors["white-200"],
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  modalFlag: {
    borderRadius: moderateScale(5),
    color: colors["gray-500"],
  },
});
