import React, { FC, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomCheckBox from "../../Components/Buttons/CustomCheckBox";
import { CustomText } from "../../Components/CustomText";
import PrivacyModal from "../../Components/Modals/PrivacyModal";
import TermsOfUseModal from "../../Components/Modals/TermsOfUseModal";
import { TermsAndConditionProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import styles from "./style";

const TermsAndConditions: FC<TermsAndConditionProps> = ({
  navigation,
  route,
}) => {
  const [isPolicyModal, setIsPolicyModal] = useState(false);
  const [isTermsModal, setIsTermsModal] = useState(false);

  // States for checkboxes
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isHealthDataChecked, setIsHealthDataChecked] = useState(false);
  const [isTermsChecked, setIsTermsCheked] = useState(false);

  // States to track whether the modal has been shown
  const [hasSeenPrivacyModal, setHasSeenPrivacyModal] = useState(false);
  const [hasSeenTermsModal, setHasSeenTermsModal] = useState(false);

  const handlePrivacyCheck = () => {
    if (!isPrivacyChecked) {
      if (!hasSeenPrivacyModal) {
        togglePrivacyModal();
        return;
      }
      if (!hasSeenTermsModal) {
        toggleTermsModal();
        return;
      }
    } else {
      setIsPrivacyChecked(true);
    }
  };

  const handleTermsCheck = () => {
    if (!isTermsChecked) {
      if (!hasSeenTermsModal) {
        toggleTermsModal();
        return;
      }
    } else {
      setIsTermsCheked(true);
    }
  };

  const handleHealthDataCheck = () => {
    setIsHealthDataChecked(!isHealthDataChecked);
  };

  const togglePrivacyModal = () => {
    setIsPolicyModal(!isPolicyModal);
  };

  const toggleTermsModal = () => {
    setIsTermsModal(!isTermsModal);
  };

  const handleAcceptAll = () => {
    if (!hasSeenPrivacyModal) {
      togglePrivacyModal();
      return;
    }
    if (!hasSeenTermsModal) {
      toggleTermsModal();
      setIsHealthDataChecked(true);
      return;
    }
    setIsHealthDataChecked(true);
  };

  const onAgreeTerms = () => {
    setHasSeenTermsModal(true);
    setIsTermsCheked(true);
    if (hasSeenPrivacyModal) {
      setIsHealthDataChecked(true);
    }
  };

  const onAgreePolicy = () => {
    setIsPrivacyChecked(true);
    setHasSeenPrivacyModal(true);
    if (!hasSeenTermsModal) {
      toggleTermsModal();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomText type="subHeading" fontFamily="bold">
        Let’s get you started!
      </CustomText>

      <View style={styles.checkBoxContainer}>
        <View style={styles.rowStart}>
          <CustomCheckBox
            isChecked={isPrivacyChecked}
            setIsChecked={handlePrivacyCheck} // Ensure user reads Privacy Policy
          />
          <CustomText style={styles.flexText}>
            I agree to processing of my personal health data for providing me
            Meditation app functions. See more in{" "}
            <CustomText
              style={styles.linkText}
              fontFamily="bold"
              onPress={togglePrivacyModal}
            >
              Privacy Policy.
            </CustomText>
          </CustomText>
        </View>

        <View style={styles.row}>
          <CustomCheckBox
            isChecked={isTermsChecked}
            setIsChecked={handleTermsCheck} // Ensure user reads Privacy Policy
          />
          <CustomText>
            I agree to{" "}
            <CustomText
              onPress={toggleTermsModal}
              style={styles.linkText}
              fontFamily="bold"
            >
              Terms of Use
            </CustomText>{" "}
          </CustomText>
        </View>

        <View style={styles.rowStart}>
          <CustomCheckBox
            isChecked={isHealthDataChecked}
            setIsChecked={handleHealthDataCheck} // Ensure user reads Terms of Use
          />
          <CustomText style={styles.flexText}>
            I agree that the app may use my personal data to send me product or
            service offerings via app or email.*
          </CustomText>
        </View>
      </View>

      <View>
        <CustomButton
          title="Accept all"
          onPress={handleAcceptAll}
          backgroundColor={COLORS.navyBlue}
          disabled={isPrivacyChecked && isHealthDataChecked && isTermsChecked}
        />
        <CustomButton
          title="Next"
          onPress={() => navigation.replace("signUp")}
          disabled={
            !isPrivacyChecked || !isHealthDataChecked || !isTermsChecked
          }
          backgroundColor={COLORS.white}
          textColor={COLORS.navyBlue}
        />

        <CustomText style={styles.footerText}>
          You can withdraw your consent anytime by contacting us at{" "}
          <CustomText fontFamily="bold">danglobus@support.com</CustomText>
        </CustomText>
      </View>
      <PrivacyModal
        isVisible={isPolicyModal}
        setIsVisible={setIsPolicyModal}
        onAgree={onAgreePolicy}
      />
      <TermsOfUseModal
        isVisible={isTermsModal}
        setIsVisible={setIsTermsModal}
        onAgree={onAgreeTerms}
      />
    </SafeAreaView>
  );
};

export default TermsAndConditions;
