import React, { FC } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import ICONS from "../../Assets/icons";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import CustomButton from "../Buttons/CustomButton";
import { CustomText } from "../CustomText";
import CustomIcon from "../CustomIcon";

type TermsOfUseModalProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  onAgree: () => void;
};

const TermsOfUseModal: FC<TermsOfUseModalProps> = ({
  isVisible,
  setIsVisible,
  onAgree,
}) => {
  const toggleModal = () => {
    setIsVisible(!isVisible);
    onAgree();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleModal}
          style={styles.closeButton}
        >
          <CustomIcon
            Icon={ICONS.crossIcon}
            height={verticalScale(30)}
            width={verticalScale(30)}
          />
        </TouchableOpacity>

        <CustomText
          style={styles.heading}
          type="subHeading"
          color={COLORS.navyBlue}
          fontFamily="bold"
        >
          Terms of Use
        </CustomText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <CustomText
            style={styles.textContent}
            type="default"
            color={COLORS.darkGrey}
            fontFamily="bold"
          >
            Welcome to our meditation app! By accessing or using the app, you
            agree to these Terms of Use. This app is for personal,
            non-commercial use only. Content, including meditations and
            features, is protected by copyright laws and must not be copied or
            redistributed. Users must be 13 years or older or have parental
            consent. The app is provided “as is,” and we are not liable for any
            damages arising from its use. We may update these terms anytime, so
            please review regularly. If you disagree with these terms,
            discontinue use immediately. Your continued use indicates acceptance
            of the
          </CustomText>
        </ScrollView>

        <CustomButton
          onPress={toggleModal}
          title="Agree"
          backgroundColor={COLORS.navyBlue}
          style={styles.agreeButton}
        />
      </View>
    </Modal>
  );
};

export default TermsOfUseModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: verticalScale(20),
    padding: verticalScale(20),
    maxHeight: hp(50),
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  crossIcon: {
    height: verticalScale(15),
    width: verticalScale(15),
  },
  heading: {
    textAlign: "center",
  },
  scrollView: {
    marginVertical: verticalScale(20),
  },
  scrollViewContent: {
    paddingHorizontal: horizontalScale(5),
  },
  textContent: {
    textAlign: "center",
  },
  agreeButton: {
    width: wp(50),
    alignSelf: "center",
  },
});
