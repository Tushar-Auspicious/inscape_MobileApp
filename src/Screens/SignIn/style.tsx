import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    justifyContent: "center",
  },

  backgroundImage: {
    flex: 1,
    marginBottom: verticalScale(60),
  },

  formContainer: {
    backgroundColor: COLORS.darkBlue,
    width: wp(100),
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 70,
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(30),
    paddingHorizontal: horizontalScale(20),
  },

  titleCont: {
    gap: verticalScale(10),
  },

  subTitle: { width: wp(70) },

  curvedImage: {
    height: 78,
    width: 73,
    top: -78.1,
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

  footerTextCont: { gap: verticalScale(20), alignItems: "center" },

  footerText: {
    textAlign: "center",
  },
  signInLink: {
    textDecorationLine: "underline",
  },
});

export default styles;
