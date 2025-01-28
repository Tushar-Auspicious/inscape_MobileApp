import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ICONS from '../../Assets/icons';
import CustomIcon from '../../Components/CustomIcon';
import { CustomText } from '../../Components/CustomText';
import { SettingsPrivacyPolicyProps } from '../../Typings/route';
import styles from './style';

const SettingsPrivacyPolicy: FC<SettingsPrivacyPolicyProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomText
          type='title'
          fontFamily='bold'
        >
          Privacy Policy
        </CustomText>
        {navigation.canGoBack() && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backArrowCont}
          >
            <CustomIcon
              Icon={ICONS.BackArrow}
              height={15}
              width={15}
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SettingsPrivacyPolicy;
