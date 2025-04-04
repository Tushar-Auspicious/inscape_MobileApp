import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backArrowCont: {
    paddingRight: horizontalScale(10),
    width: wp(8),
    position: "absolute",
    left: 0,
  },
  inputCont: {
    gap: verticalScale(20),
    paddingVertical: verticalScale(30),
    flex: 1,
  },
  genderCont: {
    gap: verticalScale(5),
    paddingBottom: verticalScale(10),
  },
  genderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
    width: "30%",
    backgroundColor: COLORS.lightNavyBlue,
    justifyContent: "flex-start",
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    borderRadius: 10,
  },
  selectedGenderOption: {
    backgroundColor: COLORS.darkNavyBlue,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  btn: {
    marginVertical: verticalScale(20),
  },
  flexInput: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    gap: horizontalScale(10),
  },
});

export default styles;
