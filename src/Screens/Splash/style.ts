import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { verticalScale } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: verticalScale(237),
    height: verticalScale(119),
  },
});

export default styles;
