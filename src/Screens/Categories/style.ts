import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";

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
    gap: horizontalScale(20),
    paddingHorizontal: horizontalScale(20),
  },
});

export default styles;
