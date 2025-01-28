import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  scrollContainer: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    gap: verticalScale(20),
  },
  flatListCont: { paddingBottom: verticalScale(60) },
});

export default styles;
