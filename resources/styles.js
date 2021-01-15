import { Dimensions, Platform, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");
const debugStyles = false;

export const colors = {
  primary: "#E63946",
  secondary: "#F1FAEE",
  tertiary: "#A8DADC",
  complementary: "#457B9D",
  background: "#1D3557",

  muted: "#E0E0E0",
  success: "#00C853",
  warning: "#FF6D00",
  danger: "#D50000",

  transparent: "transparent",
  cgpGrey: {
    100: "#ffffff",
    200: "#f6f6f6",
    300: "#eeeeee",
    400: "#cccccc",
    500: "#888888",
    600: "#666666",
    700: "#444444",
    800: "#222222",
    900: "#000000",
  },
};

export default StyleSheet.create({
  container: {
    backgroundColor: !debugStyles ? colors.background : "yellow",
    flex: 1,
    //paddingBottom: 20,
    justifyContent: "flex-start",
  },
  headerContainer: {
    backgroundColor: colors.background,
    borderBottomColor: "transparent",
  },
  headerTitle: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "400",
    color: colors.secondary,
  },
  btnGroupContainer: {
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 5,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  btnGroupBorder: {
    width: 0,
  },
  btnGroupText: {
    fontSize: 12,
    color: colors.cgpGrey[400],
    fontWeight: "bold",
  },
  btnGroupButton: {
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  btnGroupSelected: {
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
});
