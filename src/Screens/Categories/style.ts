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
  imageBackground: {
    width: "100%",
    height: hp(35),
  },
  imageContent: {
    flex: 1,
    padding: verticalScale(20),
    justifyContent: "space-between",
    backgroundColor: "rgba( 0, 0, 0, 0.25 )",
  },
  backButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
    backgroundColor: "rgba( 255, 255, 255, 0.35 )",
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  imageTextContent: {
    gap: verticalScale(10),
    flex: 0.7,
    width: "85%",
  },
  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(15),
    gap: horizontalScale(10),
    paddingHorizontal: horizontalScale(20),
    marginVertical: verticalScale(20),
  },
  searchInput: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
  },
  horizontalList: {
    paddingBottom: verticalScale(20),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  // Skeleton loading styles
  skeletonContainer: {
    flex: 1,
  },
  skeletonImageBackground: {
    width: "100%",
    height: hp(35),
    backgroundColor: COLORS.darkNavyBlue,
    opacity: 0.5,
  },
  skeletonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
  },
  skeletonSearchBar: {
    flex: 1,
    height: 44,
    backgroundColor: COLORS.darkNavyBlue,
    borderRadius: 8,
    opacity: 0.5,
  },
  skeletonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(30),
  },
  skeletonCard: {
    width: wp(40),
    height: 150,
    backgroundColor: COLORS.darkNavyBlue,
    borderRadius: 8,
    marginBottom: verticalScale(15),
    opacity: 0.5,
  },
});

export default styles;
