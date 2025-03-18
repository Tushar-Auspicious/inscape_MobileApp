import React, {FC, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ICONS from '../../Assets/icons';
import CustomButton from '../../Components/Buttons/CustomButton';
import CustomIcon from '../../Components/CustomIcon';
import CustomInput from '../../Components/CustomInput';
import {CustomText} from '../../Components/CustomText';
import {KeyboardAvoidingContainer} from '../../Components/KeyboardAvoidingComponent';
import {ForgotPasswordProps} from '../../Typings/route';
import styles from './style';
import COLORS from '../../Utilities/Colors';

const ForgotPassword: FC<ForgotPasswordProps> = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    navigation.navigate('createNewPassword');
  };

  return (
    <KeyboardAvoidingContainer backgroundColor={COLORS.darkBlue}>
      <SafeAreaView style={styles.container}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backArrowCont}>
            <CustomIcon Icon={ICONS.BackArrow} width={15} height={15} />
          </TouchableOpacity>
        )}

        <View style={styles.textContainer}>
          <CustomText type="subHeading" fontFamily="bold">
            Forgotten Password
          </CustomText>
          <CustomText>
            Please enter the email address that you used to create an account.
            We will send you an email to reset your password.
          </CustomText>
        </View>

        <CustomInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />

        <CustomButton
          title="Send email"
          onPress={handleContinue}
          style={styles.btn}
        />
      </SafeAreaView>
    </KeyboardAvoidingContainer>
  );
};

export default ForgotPassword;
