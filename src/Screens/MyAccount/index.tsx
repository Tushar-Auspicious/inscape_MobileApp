import React, { FC, useState } from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ICONS from '../../Assets/icons';
import CustomButton from '../../Components/Buttons/CustomButton';
import CustomIcon from '../../Components/CustomIcon';
import CustomInput from '../../Components/CustomInput';
import { CustomText } from '../../Components/CustomText';
import { myAccountProps } from '../../Typings/route';
import COLORS from '../../Utilities/Colors';
import { horizontalScale, verticalScale } from '../../Utilities/Metrics';
import styles from './style';

const MyAccount: FC<myAccountProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [selectedGender, setSelectedGender] = useState<
    'Male' | 'Female' | 'Other'
  >('Male'); // Gender state

  const genderTypes: ('Male' | 'Female' | 'Other')[] = [
    'Male',
    'Female',
    'Other',
  ];

  const handleSaveProfile = () => {};

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <CustomText
            type='title'
            fontFamily='bold'
          >
            My Account
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

        <View style={styles.inputCont}>
          <CustomInput
            value={fullName}
            onChangeText={setFullName}
            placeholder='Full Name'
            label='Full Name'
          />

          <CustomInput
            value={email}
            onChangeText={setEmail}
            placeholder='Email'
            label='Email'
          />

          <CustomInput
            value={companyName}
            onChangeText={setCompanyName}
            placeholder='Company Name'
            label='Company Name'
          />

          <CustomInput
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder='Birthday'
            label='Birthday'
          />

          <View style={{ gap: verticalScale(5) }}>
            <CustomText fontFamily='medium'>Gender</CustomText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {genderTypes.map((gender, index) => {
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
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: horizontalScale(10),
                      width: '30%',
                      backgroundColor: isSelected
                        ? COLORS.darkNavyBlue
                        : COLORS.lightNavyBlue,
                      borderWidth: isSelected ? 1 : 0,
                      borderColor: COLORS.white,
                      justifyContent: 'flex-start',
                      paddingVertical: verticalScale(18),
                      paddingHorizontal: horizontalScale(15),
                      borderRadius: 10,
                    }}
                    onPress={() => setSelectedGender(gender)}
                  >
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
        </View>

        <CustomButton
          title='Reset Password'
          onPress={handleSaveProfile}
          style={styles.btn}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MyAccount;
