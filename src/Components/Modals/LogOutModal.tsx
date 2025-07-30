// import React, { FC } from "react";
// import { StyleSheet, View } from "react-native";
// import RBSheet from "react-native-raw-bottom-sheet";
// import COLORS from "../../Utilities/Colors";
// import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";
// import CustomButton from "../Buttons/CustomButton";
// import { CustomText } from "../CustomText";

// type LogoutModalProps = {
//   onLogout: () => void;
//   onCancel: () => void;
//   sheetRef: any;
// };

// const LogOutModal: FC<LogoutModalProps> = ({
//   onLogout,
//   onCancel,
//   sheetRef,
// }) => {
//   return (
//     <RBSheet
//       ref={sheetRef}
//       closeOnPressMask
//       closeOnPressBack={true}
//       height={hp(30)}
//       customStyles={{
//         container: {
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//           paddingHorizontal: horizontalScale(20),
//           paddingVertical: verticalScale(20),
//         },
//       }}
//     >
//       <View>
//         <CustomText
//           fontFamily="bold"
//           type="subHeading"
//           color={COLORS.darkBlue}
//           style={{ textAlign: "center" }}
//         >
//           Log out
//         </CustomText>
//         <CustomText
//           fontFamily="regular"
//           type="title"
//           color={COLORS.darkBlue}
//           style={{ textAlign: "center", marginTop: 10 }}
//         >
//           Are you sure you want to log out?
//         </CustomText>
//         <View style={styles.btnContainer}>
//           <CustomButton
//             backgroundColor={COLORS.darkBlue}
//             textColor={COLORS.white}
//             title="Cancel"
//             onPress={onCancel}
//             style={styles.btn}
//           />
//           <CustomButton
//             title="Logout"
//             textColor={COLORS.white}
//             onPress={onLogout}
//             backgroundColor={COLORS.navyBlue}
//             style={styles.btn}
//           />
//         </View>
//       </View>
//     </RBSheet>
//   );
// };

// const styles = StyleSheet.create({
//   btn: {
//     marginVertical: verticalScale(20),
//     flex: 0.5,
//   },
//   btnContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: horizontalScale(10),
//     marginTop: 10,
//   },
// });

// export default LogOutModal;

import React, { FC } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import ICONS from "../../Assets/icons";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";
import CustomButton from "../Buttons/CustomButton";
import CustomIcon from "../CustomIcon";
import { CustomText } from "../CustomText";

type LogOutModalProps = {
  isModalVisible: boolean;
  onCancel: () => void;
  onLogout: () => void;
};

const LogOutModal: FC<LogOutModalProps> = ({
  isModalVisible,
  onCancel,
  onLogout,
}) => {
  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      animationType="slide"
      style={{ flex: 1 }}
      onRequestClose={onCancel}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onCancel}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View style={styles.sheetContainer}>
          <TouchableOpacity style={styles.crossbtn} onPress={onCancel}>
            <CustomIcon Icon={ICONS.crossIcon} width={24} height={24} />
          </TouchableOpacity>

          <View>
            <CustomText
              fontFamily="bold"
              type="subHeading"
              color={COLORS.darkBlue}
              style={{ textAlign: "center" }}
            >
              Log out
            </CustomText>
            <CustomText
              fontFamily="regular"
              type="title"
              color={COLORS.darkBlue}
              style={{ textAlign: "center", marginTop: 10 }}
            >
              Are you sure you want to log out?
            </CustomText>
            <View style={styles.btnContainer}>
              <CustomButton
                backgroundColor={COLORS.darkBlue}
                textColor={COLORS.white}
                title="Cancel"
                onPress={onCancel}
                style={styles.btn}
              />
              <CustomButton
                title="Logout"
                textColor={COLORS.white}
                onPress={onLogout}
                backgroundColor={COLORS.navyBlue}
                style={styles.btn}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default LogOutModal;

const styles = StyleSheet.create({
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    // height: hp(26),
    backgroundColor: COLORS.white,
  },
  btn: {
    marginVertical: verticalScale(20),
    flex: 0.5,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: horizontalScale(10),
    marginTop: 10,
  },
  crossbtn: {
    alignItems: "flex-end",
    marginBottom: 15,
  },
});
