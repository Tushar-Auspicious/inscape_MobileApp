import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    justifyContent: "center",
    paddingHorizontal: horizontalScale(20),
    gap: verticalScale(50),
  },
  image: {
    height: hp(25),
    alignSelf: "center",
  },
  textContainer: {
    gap: verticalScale(10),
    alignItems: "center",
  },
  infoText: {
    textAlign: "center",
  },
});

export default styles;
