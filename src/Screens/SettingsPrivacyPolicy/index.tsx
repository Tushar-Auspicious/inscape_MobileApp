import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ICONS from '../../Assets/icons';
import CustomIcon from '../../Components/CustomIcon';
import { CustomText } from '../../Components/CustomText';
import { SettingsPrivacyPolicyProps } from '../../Typings/route';
import styles from './style';
import COLORS from "../../Utilities/Colors";

const SettingsPrivacyPolicy: FC<SettingsPrivacyPolicyProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomText type="title" fontFamily="bold">
          Privacy Policy
        </CustomText>
        {navigation.canGoBack() && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backArrowCont}
          >
            <CustomIcon Icon={ICONS.BackArrow} height={15} width={15} />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 30 }}
        >
          1. Acceptance of Terms
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          By downloading, installing, accessing, or using [Your Mobile App
          Name], you agree to comply with and be bound by these terms and
          conditions, along with our Privacy Policy. If you do not agree with
          any part of these terms, you may not use our app.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          2. License
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          We grant you a non-exclusive, non-transferable, limited license to use
          [Your Mobile App Name] solely for your personal, non-commercial
          purposes, subject to these terms and the applicable app store's terms
          of service.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          3. User Account
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          Some features of [Your Mobile App Name] may require you to create an
          account. You are responsible for maintaining the confidentiality of
          your account information and for all activities that occur under your
          account. You agree to provide accurate, current, and complete
          information during the registration process and to update such
          information to keep it accurate, current, and complete.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          4. Use of the App
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ textAlign: "justify", marginTop: 15, lineHeight: 16.5 }}
        >
          You agree to use [Your Mobile App Name] only for lawful purposes and
          in a manner consistent with all applicable local, national, and
          international laws and regulations.
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

export default SettingsPrivacyPolicy;
