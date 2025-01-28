import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
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
  image: {
    height: hp(54),
    width: wp(90),
    alignSelf: "center",
  },
  textContainer: {
    gap: verticalScale(10),
    alignItems: "center",
    alignSelf: "center",
  },
  infoText: {
    textAlign: "center",
  },
});

export default styles;
