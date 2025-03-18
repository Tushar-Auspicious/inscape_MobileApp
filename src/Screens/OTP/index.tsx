import React, {FC, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ICONS from '../../Assets/icons';
import CustomButton from '../../Components/Buttons/CustomButton';
import {CustomText} from '../../Components/CustomText';
import {OTPProps} from '../../Typings/route';
import {horizontalScale, wp} from '../../Utilities/Metrics';
import styles from './style';
import CustomIcon from '../../Components/CustomIcon';
import Toast from 'react-native-toast-message';

const OTP: FC<OTPProps> = ({navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleInputChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Otp',
        text2: 'Please enter only numbers',
      });
      return; // Ignore input if it's not a number
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    navigation.replace('signIn');
  };

  const handleResendOtp = () => {};

  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={{paddingRight: horizontalScale(10), width: wp(8)}}>
            <CustomIcon Icon={ICONS.BackArrow} width={15} height={15} />
          </TouchableOpacity>
        )}

        <View style={styles.textContainer}>
          <CustomText type="subHeading" fontFamily="bold">
            Enter OTP
          </CustomText>
          <CustomText>
            We have just sent an email to you with a four digit code. Please
            enter this below.
          </CustomText>
        </View>

        <View style={styles.inputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref: any) => (inputs.current[index] = ref)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={value => handleInputChange(value, index)}
              onKeyPress={event => handleKeyPress(event, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        <CustomButton title="Continue" onPress={handleContinue} />

        <CustomText style={styles.footerText}>
          Didn't receive code?{' '}
          <CustomText
            fontFamily="bold"
            style={styles.signInLink}
            onPress={handleResendOtp}>
            Resend Code
          </CustomText>
        </CustomText>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default OTP;
