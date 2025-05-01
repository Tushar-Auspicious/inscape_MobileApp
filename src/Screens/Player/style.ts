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

  // Skeleton loading styles
  skeletonBackground: {
    flex: 1,
    marginBottom: verticalScale(60),
    backgroundColor: COLORS.darkNavyBlue,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    opacity: 0.5,
  },

  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: horizontalScale(20),
  },
  errorTitle: {
    marginBottom: verticalScale(10),
    color: COLORS.white,
    textAlign: "center",
  },
  errorMessage: {
    color: COLORS.white,
    textAlign: "center",
    marginBottom: verticalScale(30),
    opacity: 0.8,
  },
  retryButton: {
    backgroundColor: COLORS.navyBlue,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(30),
    borderRadius: 25,
    marginBottom: verticalScale(15),
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },

  backButtonText: {
    color: COLORS.white,
  },
});

export default styles;
