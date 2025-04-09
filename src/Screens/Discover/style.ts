import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  scrollContainer: {
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(15),
    gap: verticalScale(20),
    flex: 1,
  },

  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
  },

  listColumCont: {
    justifyContent: "space-between",
  },

  flatListCont: { paddingBottom: verticalScale(60) },

  list: {},
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  skeletonContainer: {
    flex: 1,
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(15),
    gap: verticalScale(20),
  },
  skeletonHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
    height: verticalScale(60),
  },
  skeletonSearchBar: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.darkNavyBlue,
    borderRadius: 8,
    opacity: 0.5,
  },
  skeletonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
  },
  skeletonCard: {
    width: wp(43),
    height: 150,
    backgroundColor: COLORS.darkNavyBlue,
    borderRadius: 8,
    marginBottom: verticalScale(15),
    opacity: 0.5,
  },
});

export default styles;
