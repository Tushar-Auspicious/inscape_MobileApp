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
  },

  backgroundImage: {
    height: hp(65),
    width: wp(100),
    marginBottom: verticalScale(60),
    backgroundColor: COLORS.darkBlue,
  },

  formContainer: {
    backgroundColor: COLORS.darkBlue,
    width: wp(100),
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 70,
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(40),
    paddingHorizontal: horizontalScale(20),
  },

  titleCont: {
    gap: verticalScale(10),
  },

  subTitle: { width: wp(70) },

  curvedImage: {
    height: 78,
    width: 73,
    top: -78,
    position: "absolute",
    tintColor: COLORS.darkBlue,
  },
  inputContainer: {
    gap: verticalScale(10),
    marginVertical: verticalScale(20),
  },
  row: {
    flexDirection: "row",
    gap: horizontalScale(10),
  },
  flexInput: {
    flex: 1,
  },

  footerTextCont: { gap: verticalScale(15), alignItems: "center" },

  footerText: {
    textAlign: "center",
  },
  signInLink: {
    textDecorationLine: "underline",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "flex-end",
    marginVertical: verticalScale(10),
    gap: horizontalScale(10),
  },
  rememberMeText: {
    color: COLORS.black,
  },
  checkboxContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    borderRadius: 3,
    paddingVertical: verticalScale(1),
    paddingHorizontal: horizontalScale(1),
  },
});

export default styles;
