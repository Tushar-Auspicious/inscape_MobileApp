import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
  },

  backArrowCont: {
    paddingRight: horizontalScale(10),
    width: wp(8),
  },

  textContainer: {
    gap: verticalScale(10),
    paddingRight: horizontalScale(20),
    marginVertical: verticalScale(50),
  },

  inputCont: {
    gap: verticalScale(10),
  },

  btn: {
    marginVertical: verticalScale(20),
  },
});

export default styles;
