import React, { FC, useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IMAGES from "../../Assets/images";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { SignUpProps } from "../../Typings/route";
import { getKeyboardBehaviour } from "../../Utilities/Helpers";
import styles from "./style";

const SignUp: FC<SignUpProps> = ({ navigation }) => {
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleContinue = () => {
    navigation.navigate("registerSuccess");
  };

  return (
    <KeyboardAvoidingView behavior={getKeyboardBehaviour} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={IMAGES.pinkBg}
          style={styles.backgroundImage}
        />
        <View style={styles.formContainer}>
          <Image
            source={IMAGES.curvedView}
            style={styles.curvedImage}
            resizeMode="contain"
          />
          <CustomText fontFamily="bold" type="title">
            Sign Up
          </CustomText>
          <View style={styles.inputContainer}>
            <View style={styles.row}>
              <CustomInput
                value={inputData.firstName}
                placeholder="First Name"
                onChangeText={(value) => handleInputChange("firstName", value)}
                style={styles.flexInput}
              />
              <CustomInput
                value={inputData.lastName}
                placeholder="Last Name"
                onChangeText={(value) => handleInputChange("lastName", value)}
                style={styles.flexInput}
              />
            </View>
            <CustomInput
              value={inputData.companyName}
              placeholder="Company Name"
              onChangeText={(value) => handleInputChange("companyName", value)}
            />
            <CustomInput
              value={inputData.email}
              placeholder="Email"
              onChangeText={(value) => handleInputChange("email", value)}
            />
            <CustomInput
              value={inputData.password}
              placeholder="Password"
              type="password"
              onChangeText={(value) => handleInputChange("password", value)}
            />
            <CustomInput
              value={inputData.confirmPassword}
              placeholder="Confirm Password"
              type="password"
              onChangeText={(value) =>
                handleInputChange("confirmPassword", value)
              }
            />
            <CustomButton title="Create account" onPress={handleContinue} />
          </View>
          <CustomText style={styles.footerText}>
            Already have an account?{" "}
            <CustomText
              fontFamily="bold"
              style={styles.signInLink}
              onPress={() => navigation.navigate("signIn")}
            >
              Sign In
            </CustomText>
          </CustomText>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
