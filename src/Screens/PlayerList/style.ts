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
    justifyContent: "center",
  },
  curvedCont: {
    backgroundColor: COLORS.darkNavyBlue,
    width: wp(100),
    height: hp(55),
    position: "absolute",
    borderTopRightRadius: 70,
    borderBottomLeftRadius: 70,
  },
  topCurvedImage: {
    height: 78,
    width: 73,
    top: -78,
    position: "absolute",
    tintColor: COLORS.darkNavyBlue,
  },
  bottomCurvedImage: {
    height: 78,
    width: 73,
    bottom: -78,
    right: 0,
    position: "absolute",
    tintColor: COLORS.darkNavyBlue,
    transform: [{ rotate: "180deg" }],
  },

  backButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
    backgroundColor: "rgba( 255, 255, 255, 0.35 )",
    borderRadius: 5,
  },

  content: { flex: 1 },

  mainHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: horizontalScale(20),
    paddingTop: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
  },

  headerTextCont: {
    gap: verticalScale(5),
    flex: 1,
    marginBottom: verticalScale(30),
  },

  listCard: {
    alignItems: "center",
    width: wp(100),
  },

  cardImage: {
    width: "70%",
    height: "100%",
    borderRadius: 40,
    overflow: "hidden",
    boxShadow: "rgba(220, 21, 21, 1)",
  },

  cardImageStyle: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },

  cardContent: {
    backgroundColor: COLORS.white,
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopRightRadius: 30,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
  },

  cardContentImage: {
    height: 48,
    width: 43,
    top: -47,
    position: "absolute",
    tintColor: COLORS.white,
  },

  cardTextCont: { gap: verticalScale(3), flex: 1 },

  cardPlayButton: {
    backgroundColor: COLORS.navyBlue,
    padding: 15,
    borderRadius: 100,
  },

  footerCont: {
    gap: verticalScale(20),
  },

  footerContent: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingLeft: horizontalScale(20),
    paddingRight: horizontalScale(50),
  },

  footerLeftCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
  },
  footerLeftImage: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },

  footerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(20),
  },

  footerProgressBar: {
    backgroundColor: COLORS.mixGreyBlue,
    width: "100%",
    height: 4,
    position: "relative",
  },

  footerProgressComplete: {
    backgroundColor: COLORS.darkNavyBlue,
    height: 4,
    position: "absolute",
    top: 0,
    left: 0,
  },

  // Skeleton loading styles
  skeletonContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  skeletonCurvedCont: {
    backgroundColor: COLORS.darkNavyBlue,
    width: wp(100),
    height: hp(55),
    position: "absolute",
    borderTopRightRadius: 70,
    borderBottomLeftRadius: 70,
    opacity: 0.7,
  },
  skeletonHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: horizontalScale(20),
    paddingTop: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
  },
  skeletonBackButton: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
  },
  skeletonHeaderText: {
    width: wp(60),
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    marginBottom: 10,
  },
  skeletonHeaderSubText: {
    width: wp(40),
    height: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
  },
  skeletonCardContainer: {
    marginTop: verticalScale(30),
    alignItems: "center",
  },
  skeletonCard: {
    width: wp(70),
    height: hp(40),
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
