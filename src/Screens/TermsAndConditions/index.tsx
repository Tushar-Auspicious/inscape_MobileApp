import React, { FC, useState } from "react";
import { Linking, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomCheckBox from "../../Components/Buttons/CustomCheckBox";
import { CustomText } from "../../Components/CustomText";
import PrivacyModal from "../../Components/Modals/PrivacyModal";
import { TermsAndConditionProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import STORAGE_KEYS from "../../Utilities/Constants";
import { verticalScale } from "../../Utilities/Metrics";
import { storeLocalStorageData } from "../../Utilities/Storage";
import styles from "./style";

const TermsAndConditions: FC<TermsAndConditionProps> = ({
  navigation,
  route,
}) => {
  const [isPolicyModal, setIsPolicyModal] = useState(false);

  // States for checkboxes
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isHealthDataChecked, setIsHealthDataChecked] = useState(false);
  const [isTermsChecked, setIsTermsCheked] = useState(false);

  const [activeModalState, setActiveModalState] = useState<"privacy" | "terms">(
    "privacy"
  );

  const handlePrivacyCheck = () => {
    setIsPrivacyChecked(!isPrivacyChecked);
  };

  const handleTermsCheck = () => {
    setIsTermsCheked(!isTermsChecked);
  };

  const handleHealthDataCheck = () => {
    setIsHealthDataChecked(!isHealthDataChecked);
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
              onPress={() => {
                setActiveModalState("privacy");
                setIsPolicyModal(true);
              }}
              style={styles.linkText}
              fontFamily="bold"
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
              onPress={() => {
                setActiveModalState("terms");
                setIsPolicyModal(true);
              }}
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
            service offerings via app or email.
          </CustomText>
        </View>
      </View>

      <View
        style={{
          gap: verticalScale(10),
        }}
      >
        <CustomButton
          title="Accept all"
          onPress={async () => {
            setIsPrivacyChecked(true);
            setIsHealthDataChecked(true);
            setIsTermsCheked(true);
            await storeLocalStorageData(STORAGE_KEYS.isTermsAccepted, true);
            navigation.replace("signIn");
          }}
          backgroundColor={COLORS.navyBlue}
          disabled={isPrivacyChecked && isHealthDataChecked && isTermsChecked}
        />
        <CustomButton
          title="Next"
          onPress={async () => {
            await storeLocalStorageData(STORAGE_KEYS.isTermsAccepted, true);
            navigation.replace("signIn");
          }}
          disabled={
            !isPrivacyChecked || !isHealthDataChecked || !isTermsChecked
          }
          backgroundColor={COLORS.white}
          textColor={COLORS.navyBlue}
        />

        <CustomText style={styles.footerText}>
          You can withdraw your consent anytime by contacting us at{" "}
          <CustomText
            onPress={() => {
              Linking.openURL("mailto:support@example.com");
            }}
            fontFamily="bold"
          >
            support@inscape.life
          </CustomText>
        </CustomText>
      </View>
      <PrivacyModal
        isVisible={isPolicyModal}
        setIsVisible={setIsPolicyModal}
        onAgree={() => {
          setIsPolicyModal(false);
        }}
        activeIndex={activeModalState}
      />
    </SafeAreaView>
  );
};

export default TermsAndConditions;
