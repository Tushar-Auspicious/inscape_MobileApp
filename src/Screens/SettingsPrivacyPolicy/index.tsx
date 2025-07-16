import React, { FC, useMemo } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import { useAppSelector } from "../../Redux/store";
import { SettingsPrivacyPolicyProps } from "../../Typings/route";
import { verticalScale, wp } from "../../Utilities/Metrics";
import styles from "./style";
import { generateTagStylesFromHTML } from "../SettingTermsCondition";

const SettingsPrivacyPolicy: FC<SettingsPrivacyPolicyProps> = ({
  navigation,
}) => {
  const { privacyPolicy } = useAppSelector((state) => state.setting);

  console.log(privacyPolicy);

  const dynamicTagStyles = useMemo(() => {
    if (privacyPolicy) {
      return generateTagStylesFromHTML(privacyPolicy);
    }
    return {};
  }, [privacyPolicy]);

  console.log(dynamicTagStyles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomText type="title" fontFamily="bold">
          Privacy Policy
        </CustomText>
        {navigation.canGoBack() && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backArrowCont}
          >
            <CustomIcon Icon={ICONS.BackArrow} height={15} width={15} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: verticalScale(10) }}>
        <RenderHTML
          contentWidth={wp(90)}
          source={{ html: privacyPolicy || "" }}
          tagsStyles={{
            ...dynamicTagStyles,
            h1: {
              ...dynamicTagStyles.h1,
              fontSize: 24,
              marginBottom: 10,
              fontWeight: "bold",
            },
            span: {
              ...dynamicTagStyles.span,
              textDecorationLine: "none",
              fontSize: 16,
            },
            strong:{
              fontWeight: "bold",
              marginBottom: 10,
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsPrivacyPolicy;
