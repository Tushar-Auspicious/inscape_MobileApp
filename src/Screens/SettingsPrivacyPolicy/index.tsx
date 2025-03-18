import React, { FC } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import { SettingsPrivacyPolicyProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { verticalScale } from "../../Utilities/Metrics";
import styles from "./style";

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
      <ScrollView contentContainerStyle={{ paddingBottom: verticalScale(10) }}>
        <CustomText fontFamily="regular" type="title" color={COLORS.white}>
          1. Introduction
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          This Privacy Policy outlines how Inscape ("the Company") collects,
          uses, discloses, and protects the personal information of users of the
          Sawtiyat application ("the App"). By using the App, you consent to the
          collection and use of your personal information as described in this
          Privacy Policy.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          2. Information We Collect
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          Email address: We collect your email address to create and manage your
          account, send you important notifications about your account, and
          communicate with you regarding the App.
          {"\n\n"}
          Password: We collect your chosen password to secure your account and
          authenticate your identity when you log in to the App.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          3. How We Use Your Information
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5, textAlign: "justify" }}
        >
          To create and manage your account.
          {"\n"}
          To provide you with access to the features and functionalities of the
          App.
          {"\n"}
          To communicate with you about your account, updates to the App, and
          promotional offers.
          {"\n"}
          To personalize your experience with the App and provide tailored
          content and recommendations.
          {"\n"}
          To improve the quality and usability of the App and develop new
          features and functionalities.
          {"\n"}
          To comply with legal obligations and enforce our Terms and Conditions.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          4. Information Sharing and Disclosure
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          With service providers: We may share your information with third-party
          service providers who assist us in operating the App, processing
          payments, and delivering services to you.
          {"\n\n"}
          With affiliates: We may share your information with our affiliated
          companies for marketing and promotional purposes, but we will not
          share your information with third-party advertisers without your
          consent.
          {"\n\n"}
          With legal authorities: We may disclose your information to comply
          with legal obligations, respond to lawful requests from law
          enforcement agencies, or protect the rights, property, or safety of
          our users or others.
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="title"
          color={COLORS.white}
          style={{ marginTop: 25 }}
        >
          5. Data Security
        </CustomText>
        <CustomText
          fontFamily="regular"
          type="small"
          color={COLORS.white}
          style={{ marginTop: 15, lineHeight: 16.5 }}
        >
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          disclosure, alteration, or destruction. However, no method of
          transmission over the internet or electronic storage is 100% secure,
          and we cannot guarantee the absolute security of your information.
        </CustomText>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsPrivacyPolicy;
