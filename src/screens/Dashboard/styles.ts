import { StyleSheet } from "react-native";

export const DashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    paddingTop: "40%",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 60,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 30,
  },
  button: {
    backgroundColor: "#ff4081",
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    minHeight: 120,
  },
  comingSoonButton: {
    backgroundColor: "#666666",
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  buttonDescription: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    opacity: 0.9,
    paddingHorizontal: 20,
  },
});
