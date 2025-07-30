import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import {
  getAdjustedFontSize,
  horizontalScale,
  responsiveFontSize,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    gap: verticalScale(40),
  },
  textContainer: {
    gap: verticalScale(10),
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: horizontalScale(15),
  },
  input: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: horizontalScale(15),
    backgroundColor: COLORS.lightNavyBlue,
    height: 72,
    fontSize: getAdjustedFontSize(responsiveFontSize(16)),
    color: COLORS.white,
    textAlign: "center",
  },
  footerText: {
    textAlign: "center",
  },
  signInLink: {
    textDecorationLine: "underline",
  },
});

export default styles;
