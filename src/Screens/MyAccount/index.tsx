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
import { myAccountProps } from "../../Typings/route";
import styles from "./style";

const MyAccount: FC<myAccountProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [selectedGender, setSelectedGender] = useState<
    "Male" | "Female" | "Other"
  >("Male"); // Gender state

  const genderTypes: ("Male" | "Female" | "Other")[] = [
    "Male",
    "Female",
    "Other",
  ];

  const handleSaveProfile = () => {};

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <CustomText type="title" fontFamily="bold">
            My Account
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

        <View style={styles.inputCont}>
          <CustomInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
            label="Full Name"
            heigth={44}
          />

          <CustomInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            label="Email"
            heigth={44}
          />

          <CustomInput
            value={companyName}
            onChangeText={setCompanyName}
            placeholder="Company Name"
            label="Company Name"
            heigth={44}
          />

          {/* <CustomInput
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder="Birthday"
            label="Birthday"
            heigth={44}
          /> */}

          {/* <View style={styles.genderCont}>
            <CustomText fontFamily="medium">Gender</CustomText>
            <View style={styles.genderRow}>
              {genderTypes.map((gender) => {
                const renderGenderIcon = () => {
                  if (gender === "Male") {
                    return ICONS.maleIcon;
                  }
                  if (gender === "Female") {
                    return ICONS.femaleIcon;
                  } else {
                    return ICONS.otherIcon;
                  }
                };

                const isSelected = gender === selectedGender;

                return (
                  <Pressable
                    style={[
                      styles.genderOption,
                      isSelected && styles.selectedGenderOption,
                    ]}
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
          </View> */}
        </View>

        <CustomButton
          title="Save"
          onPress={handleSaveProfile}
          style={styles.btn}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MyAccount;
