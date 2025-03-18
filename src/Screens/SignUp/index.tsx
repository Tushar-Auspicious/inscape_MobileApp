import React, { FC, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ICONS from '../../Assets/icons';
import CustomButton from '../../Components/Buttons/CustomButton';
import CustomIcon from '../../Components/CustomIcon';
import CustomInput from '../../Components/CustomInput';
import {CustomText} from '../../Components/CustomText';
import {SignUpProps} from '../../Typings/route';
import {verticalScale} from '../../Utilities/Metrics';
import styles from './style';

const SignUp: FC<SignUpProps> = ({navigation}) => {
  const [inputData, setInputData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [birthDate, setBirthDate] = useState('');

  const [selectedGender, setSelectedGender] = useState<
    'Male' | 'Female' | 'Other'
  >('Male');

  const genderTypes: ('Male' | 'Female' | 'Other')[] = [
    'Male',
    'Female',
    'Other',
  ];

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleContinue = () => {
    navigation.navigate('registerSuccess');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View style={styles.formContainer}>
            <CustomText fontFamily="bold" type="title">
              Sign Up
            </CustomText>
            <View style={styles.inputContainer}>
              <View style={styles.row}>
                <CustomInput
                  value={inputData.firstName}
                  placeholder="First Name"
                  onChangeText={value => handleInputChange('firstName', value)}
                  style={styles.flexInput}
                  heigth={50}
                />
                <CustomInput
                  value={inputData.lastName}
                  placeholder="Last Name"
                  onChangeText={value => handleInputChange('lastName', value)}
                  style={styles.flexInput}
                  heigth={50}
                />
              </View>
              <CustomInput
                value={inputData.companyName}
                placeholder="Company Name"
                onChangeText={value => handleInputChange('companyName', value)}
                heigth={50}
              />
              <CustomInput
                value={inputData.email}
                placeholder="Email"
                onChangeText={value => handleInputChange('email', value)}
                heigth={50}
              />
              <CustomInput
                value={inputData.password}
                placeholder="Password"
                type="password"
                onChangeText={value => handleInputChange('password', value)}
                heigth={50}
              />
              <CustomInput
                value={inputData.confirmPassword}
                placeholder="Confirm Password"
                type="password"
                onChangeText={value =>
                  handleInputChange('confirmPassword', value)
                }
                heigth={50}
              />
              <CustomInput
                value={birthDate}
                onChangeText={setBirthDate}
                placeholder="Birthday"
                type="date"
                heigth={50}
              />
              <View style={styles.genderCont}>
                <CustomText fontFamily="medium">Gender</CustomText>
                <View style={styles.genderRow}>
                  {genderTypes.map(gender => {
                    const renderGenderIcon = () => {
                      if (gender === 'Male') {
                        return ICONS.maleIcon;
                      }
                      if (gender === 'Female') {
                        return ICONS.femaleIcon;
                      } else {
                        return ICONS.otherIcon;
                      }
                    };

                    const isSelected = gender === selectedGender;

                    return (
                      <Pressable
                        key={gender}
                        style={[
                          styles.genderOption,
                          isSelected && styles.selectedGenderOption,
                        ]}
                        onPress={() => setSelectedGender(gender)}>
                        <CustomIcon
                          Icon={renderGenderIcon()}
                          width={20}
                          height={20}
                        />
                        <CustomText>{gender}</CustomText>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <CustomButton
                title="Create account"
                onPress={handleContinue}
                style={{marginTop: verticalScale(30)}}
              />
            </View>
            <CustomText style={styles.footerText}>
              Already have an account?{' '}
              <CustomText
                fontFamily="bold"
                style={styles.signInLink}
                onPress={() => navigation.navigate('signIn')}>
                Sign In
              </CustomText>
            </CustomText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
