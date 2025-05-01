import React, { FC } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import ICONS from "../../Assets/icons";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";
import CustomButton from "../Buttons/CustomButton";
import CustomIcon from "../CustomIcon";
import { CustomText } from "../CustomText";

type DeleteModalProps = {
  isModalVisible: boolean;
  onClose: () => void;
  onPressDelete: () => void;
};

const DeleteModal: FC<DeleteModalProps> = ({
  isModalVisible,
  onClose,
  onPressDelete,
}) => {
  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      animationType="slide"
      style={{ flex: 1 }}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View style={styles.sheetContainer}>
          <TouchableOpacity style={styles.crossbtn} onPress={onClose}>
            <CustomIcon Icon={ICONS.crossIcon} width={24} height={24} />
          </TouchableOpacity>

          <View>
            <CustomText
              fontFamily="bold"
              type="subHeading"
              color={COLORS.darkBlue}
              style={{ textAlign: "center" }}
            >
              Delete Audio
            </CustomText>
            <CustomText
              fontFamily="regular"
              type="title"
              color={COLORS.darkBlue}
              style={{ textAlign: "center", marginTop: 10 }}
            >
              Are you sure you want to delete this audio?
            </CustomText>
            <View style={styles.btnContainer}>
              <CustomButton
                backgroundColor={COLORS.darkBlue}
                textColor={COLORS.white}
                title="Cancel"
                onPress={onClose}
                style={styles.btn}
              />
              <CustomButton
                title="Delete"
                textColor={COLORS.white}
                onPress={onPressDelete}
                backgroundColor={"crimson"}
                style={styles.btn}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    height: hp(26),
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
