import { StyleSheet, Dimensions } from "react-native";

export const LanguageSelectorStyles = StyleSheet.create({
  container: {},
  flagContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 44,
  },
  flag: {
    borderRadius: 5,
  },
  label: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 20,
    width: Dimensions.get("window").width * 0.8,
    maxWidth: 400,
    shadowColor: "#000",
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
    gap: 15,
  },
  flagButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  modalFlag: {
    borderRadius: 5,
    color: "rgba(255, 255, 255, 0.2)",
  },
});
