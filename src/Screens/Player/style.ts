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
    position: "relative",
  },

  imageStyle: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },

  backButton: {
    position: "absolute",
    zIndex: 100,
    left: wp(5),
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
    backgroundColor: "rgba( 255, 255, 255, 0.35 )",
    borderRadius: 5,
  },

  playerCont: {
    backgroundColor: COLORS.darkBlue,
    width: wp(100),
    position: "absolute",
    borderTopRightRadius: 70,
    paddingVertical: verticalScale(30),
    paddingHorizontal: horizontalScale(20),
  },
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
  footerText: {
    textAlign: "center",
  },
  signInLink: {
    textDecorationLine: "underline",
  },
});

export default styles;
