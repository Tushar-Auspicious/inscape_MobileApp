import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: COLORS.darkBlue,
  //   justifyContent: "center",
  // },
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  formContainer: {
    backgroundColor: COLORS.darkBlue,
    width: wp(100),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    gap: verticalScale(20),
  },
  curvedImage: {
    height: 78,
    width: 73,
    top: -78,
    position: "absolute",
    tintColor: COLORS.darkBlue,
  },
  inputContainer: {
    gap: verticalScale(10),
    marginVertical: verticalScale(20),
  },
  row: {
    flexDirection: "row",
    gap: horizontalScale(10),
  },
  flexInput: {
    flex: 1,
  },
  footerText: {
    textAlign: "center",
  },
  signInLink: {
    textDecorationLine: "underline",
  },

  genderCont: {
    gap: verticalScale(5),
    marginVertical: verticalScale(3),
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
});

export default styles;
