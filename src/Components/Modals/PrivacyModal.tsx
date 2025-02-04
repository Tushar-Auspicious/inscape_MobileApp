import React, { FC } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
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
import CustomIcon from "../CustomIcon";
import { CustomText } from "../CustomText";

type PrivacyModalProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  onAgree: () => void;
  activeIndex: "privacy" | "terms";
};

const modalData = [
  {
    title: "Privacy Policy",
    content:
      "Your privacy is important to us. Our meditation app collects only necessary data, such as your name, email, and usage patterns, to provide a personalized experience. We do not sell or share your information with third parties without your consent. All data is securely stored and protected using industry-standard measures. You may update or delete your information at any time. The app may use cookies or analytics to improve functionality but ensures anonymity. By using the app, you agree to this policy. For questions or concerns, please contact our support team. Your mindfulness journey is",
  },
  {
    title: "Terms of Use",
    content:
      "Welcome to our meditation app! By accessing or using the app, you agree to these Terms of Use. This app is for personal, non-commercial use only. Content, including meditations and features, is protected by copyright laws and must not be copied or redistributed. Users must be 13 years or older or have parental consent. The app is provided “as is,” and we are not liable for any damages arising from its use. We may update these terms anytime, so please review regularly. If you disagree with these terms, discontinue use immediately. Your continued use indicates acceptance of the",
  },
];

const PrivacyModal: FC<PrivacyModalProps> = ({
  isVisible,
  setIsVisible,
  onAgree,
  activeIndex,
}) => {
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const activeModalData =
    activeIndex === "privacy" ? modalData[0] : modalData[1];

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
          {activeModalData.title}
        </CustomText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <CustomText
            style={styles.textContent}
            color={COLORS.darkGrey}
            fontFamily="bold"
          >
            {activeModalData.content}
          </CustomText>
        </ScrollView>

        <CustomButton
          onPress={onAgree}
          title="Agree"
          backgroundColor={COLORS.navyBlue}
          style={styles.agreeButton}
        />
      </View>
    </Modal>
  );
};

export default PrivacyModal;

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
