import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  scrollContainer: {
    paddingTop: verticalScale(20),
  },
  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
  },
  horizontalList: {
    paddingHorizontal: horizontalScale(20),
  },
  verticalList: {
    paddingHorizontal: horizontalScale(20),
  },
});

export default styles;
