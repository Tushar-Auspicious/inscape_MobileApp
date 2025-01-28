import { StyleSheet } from 'react-native';
import COLORS from '../../Utilities/Colors';
import { horizontalScale, verticalScale, wp } from '../../Utilities/Metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
  },

  backArrowCont: {
    paddingRight: horizontalScale(10),
    width: wp(8),
    position: 'absolute',
    left: 0,
  },

  inputCont: {
    gap: verticalScale(30),
    paddingVertical: verticalScale(30),
    flex: 1,
  },

  btn: {
    marginVertical: verticalScale(20),
  },
});

export default styles;
