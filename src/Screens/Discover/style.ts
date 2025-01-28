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

  listColumCont: {
    justifyContent: 'space-between',
  },

  flatListCont: { paddingBottom: verticalScale(60) },
});

export default styles;
