import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    paddingVertical: verticalScale(10),
  },
  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(15),
    gap: horizontalScale(10),
    paddingHorizontal: horizontalScale(20),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
  },
  list: {
    paddingHorizontal: horizontalScale(20),
  },
});

export default styles;
