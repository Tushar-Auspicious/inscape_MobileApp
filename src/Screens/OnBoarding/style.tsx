import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },

  slideContainer: {
    alignItems: "center",
    paddingVertical: verticalScale(10),
    width: wp(100),
    paddingHorizontal: wp(10),
  },

  slideImage: {
    height: 458,
    resizeMode: "cover",
    width: wp(90),
    borderRadius: verticalScale(10),
  },

  slideTextCont: {
    gap: verticalScale(10),
  },

  subtitle: {
    color: COLORS.white,
    fontSize: responsiveFontSize(14),
    textAlign: "center",
    lineHeight: responsiveFontSize(19.6),
    maxWidth: wp(60),
  },

  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },

  buttonCont: {
    paddingVertical: verticalScale(10),
    width: wp(100),
    alignItems: "center",
    gap: verticalScale(10),
  },

  skipText: {
    textDecorationLine: "underline",
    color: COLORS.white,
    fontWeight: "800",
  },

  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },

  indicatorCont: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: verticalScale(10),
  },

  indicator: {
    height: verticalScale(9),
    width: verticalScale(9),
    backgroundColor: COLORS.darkGrey,
    marginHorizontal: horizontalScale(5),
    borderRadius: 100,
  },
});

export default styles;
