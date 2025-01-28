import React, { FC, useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
} from "react-native";
import IMAGES from "../../Assets/images";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { SignInProps } from "../../Typings/route";
import styles from "./style";
import { getKeyboardBehaviour } from "../../Utilities/Helpers";

const SignIn: FC<SignInProps> = ({ navigation }) => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleLogin = () => {
    navigation.navigate("mainStack", {
      screen: "tabs",
      params: {
        screen: "homeTab",
      },
    });
  };

  const handleForgotPassword = () => {
    navigation.navigate("forgotPassword");
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
          <View style={styles.titleCont}>
            <CustomText fontFamily="bold" type="title">
              Sign In
            </CustomText>
            <CustomText style={styles.subTitle}>
              Use the same method that you created your account with.
            </CustomText>
          </View>

          <View style={styles.inputContainer}>
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
            <CustomButton title="Create account" onPress={handleLogin} />
          </View>

          <View style={styles.footerTextCont}>
            <CustomText
              onPress={handleForgotPassword}
              style={styles.footerText}
              fontFamily="bold"
            >
              Forgot password?
            </CustomText>

            <CustomText style={styles.footerText}>
              Don't have an account?{" "}
              <CustomText
                onPress={() => navigation.navigate("signUp")}
                fontFamily="bold"
                style={styles.signInLink}
              >
                Sign Up
              </CustomText>
            </CustomText>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
