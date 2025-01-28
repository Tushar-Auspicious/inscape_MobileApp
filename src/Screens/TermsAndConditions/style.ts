import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    justifyContent: "center",
    padding: horizontalScale(20),
    gap: verticalScale(70),
  },

  checkBoxContainer: {
    gap: verticalScale(15),
    marginTop: verticalScale(20),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(20),
  },
  rowStart: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: horizontalScale(20),
  },
  linkText: {
    textDecorationLine: "underline",
  },
  flexText: {
    flex: 1,
  },
  footerText: {
    textAlign: "center",
    marginTop: verticalScale(20),
  },
});

export default styles;
