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
    height: hp(60),
    width: wp(95),
    alignSelf: "center",
    resizeMode: "cover",
    borderRadius: 10,
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
