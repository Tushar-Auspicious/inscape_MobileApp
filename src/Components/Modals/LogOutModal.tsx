import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";
import CustomButton from "../Buttons/CustomButton";
import { CustomText } from "../CustomText";

type LogoutModalProps = {
  onLogout: () => void;
  onCancel: () => void;
  sheetRef: any;
};

const LogOutModal: FC<LogoutModalProps> = ({
  onLogout,
  onCancel,
  sheetRef,
}) => {
  return (
    <RBSheet
      ref={sheetRef}
      closeOnPressMask
      closeOnPressBack={true}
      height={hp(26)}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: verticalScale(20),
        },
      }}
    >
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
    </RBSheet>
  );
};

const styles = StyleSheet.create({
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
});

export default LogOutModal;
