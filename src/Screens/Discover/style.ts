import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  scrollContainer: {
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(15),
    gap: verticalScale(20),
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
});

export default styles;
