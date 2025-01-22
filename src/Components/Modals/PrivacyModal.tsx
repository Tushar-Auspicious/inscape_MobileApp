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

type PrivacyModalProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

const PrivacyModal: FC<PrivacyModalProps> = ({ isVisible, setIsVisible }) => {
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleModal}
          style={styles.closeButton}
        >
          <Image source={ICONS.crossIcon} style={styles.crossIcon} />
        </TouchableOpacity>

        <CustomText
          style={styles.heading}
          type="subHeading"
          color={COLORS.navyBlue}
          fontFamily="bold"
        >
          Privacy Policy
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
            Your privacy is important to us. Our meditation app collects only
            necessary data, such as your name, email, and usage patterns, to
            provide a personalized experience. We do not sell or share your
            information with third parties without your consent. All data is
            securely stored and protected using industry-standard measures. You
            may update or delete your information at any time. The app may use
            cookies or analytics to improve functionality but ensures anonymity.
            By using the app, you agree to this policy. For questions or
            concerns, please contact our support team. Your mindfulness journey
            ties without your consent. All data is securely stored and protected
            using industry-standard measures. You may update or delete your
            information at any time. The app may use cookies or analytics to
            improve functionality but ensures anonymity. By using the app, you
            agree to this policy. For questions or concerns, please contact our
            support team. Your mindfulness journey is...
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
