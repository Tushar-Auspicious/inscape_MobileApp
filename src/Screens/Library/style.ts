import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  scrollContainer: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    gap: verticalScale(20),
    flex: 1,
  },
  flatListCont: {
    paddingBottom: verticalScale(60),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(50),
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(20),
  },
  emptyStateIcon: {
    marginBottom: verticalScale(20),
    opacity: 0.8,
  },
  emptyStateText: {
    textAlign: "center",
    marginBottom: verticalScale(10),
    color: COLORS.white,
  },
  emptyStateSubText: {
    textAlign: "center",
    color: COLORS.grey,
    marginBottom: verticalScale(30),
    paddingHorizontal: horizontalScale(20),
  },
  discoverButton: {
    backgroundColor: COLORS.navyBlue,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(30),
    borderRadius: 25,
    marginTop: verticalScale(10),
  },
  discoverButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    minHeight: hp(50),
  },
  emptyListContent: {
    flexGrow: 1, // This is crucial for centering content in a FlatList
    justifyContent: "center", // Centers children vertically
    alignItems: "center", // Centers children horizontally
    paddingHorizontal: 30, // Add some padding around the content
  },
});

export default styles;
