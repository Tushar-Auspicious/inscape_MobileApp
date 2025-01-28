import React, { FC, useState } from "react";
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ICONS from '../../Assets/icons';
import CustomButton from '../../Components/Buttons/CustomButton';
import CustomIcon from '../../Components/CustomIcon';
import CustomInput from '../../Components/CustomInput';
import { CustomText } from '../../Components/CustomText';
import { CreateNewPasswordProps } from '../../Typings/route';
import styles from './style';

const CreateNewPassword: FC<CreateNewPasswordProps> = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    navigation.navigate('passwordSuccess');
  };

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
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

        <View style={styles.textContainer}>
          <CustomText
            type='subHeading'
            fontFamily='bold'
          >
            Create New Password
          </CustomText>
          <CustomText>
            Your new password must be different from your previously used
            password.
          </CustomText>
        </View>

        <View style={styles.inputCont}>
          <CustomInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder='New Password'
            type='password'
          />

          <CustomInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder='Confirm New Password'
            type='password'
          />
        </View>

        <CustomButton
          title='Reset Password'
          onPress={handleResetPassword}
          style={styles.btn}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateNewPassword;
