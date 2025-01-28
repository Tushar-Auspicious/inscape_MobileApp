import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  scrollContainer: {
    flex: 1,
    gap: verticalScale(20),
  },
  backgroundImage: {
    flex: 1,
    marginBottom: verticalScale(60),
  },

  container: {
    backgroundColor: COLORS.darkBlue,
    width: wp(100),
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 70,
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(50),
    paddingHorizontal: horizontalScale(20),
  },

  curvedImage: {
    height: 78,
    width: 73,
    top: -78.1,
    position: "absolute",
    tintColor: COLORS.darkBlue,
  },
});

export default styles;
