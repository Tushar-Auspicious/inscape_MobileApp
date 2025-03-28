import React, { FC, useState } from "react";
import { Image, ImageBackground, SafeAreaView, View } from "react-native";
import Toast from "react-native-toast-message";
import { postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import IMAGES from "../../Assets/images";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import { LoginResponse } from "../../Typings/apiTypes";
import { SignInProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import STORAGE_KEYS from "../../Utilities/Constants";
import { isValidEmail } from "../../Utilities/Helpers";
import { storeLocalStorageData } from "../../Utilities/Storage";
import styles from "./style";
import { useAppSelector } from "../../Redux/store";

const SignIn: FC<SignInProps> = ({ navigation }) => {
  const [inputData, setInputData] = useState({
    email: "tushar@auspicioussoft.com",
    password: "12345",
  });

  const { isOnBoarded, isTermsAccepted, token, isRegistered } = useAppSelector(
    (state) => state.initial
  );

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!inputData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(inputData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!inputData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await postData<LoginResponse>(
        ENDPOINTS.login,
        {
          email: inputData.email,
          password: inputData.password,
        },
        {
          "x-client-type": "mobile",
        }
      );

      console.log(response);

      if (response.data.success) {
        await storeLocalStorageData(
          STORAGE_KEYS.token,
          response.data.data.token
        );
        navigation.navigate("mainStack", {
          screen: "tabs",
          params: { screen: "homeTab" },
        });
      } else {
        Toast.show({
          type: "error",
          text1: response.data.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Login failed",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleForgotPassword = () => {
    navigation.navigate("forgotPassword");
  };

  return (
    <KeyboardAvoidingContainer backgroundColor={COLORS.darkBlue}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={IMAGES.signInbackground}
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
            <CustomButton
              title="Sign In"
              onPress={handleLogin}
              isLoading={isLoading}
            />
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
                onPress={() => {
                  if (isRegistered?.registered) {
                    navigation.navigate("registerSuccess");
                  } else {
                    navigation.navigate("signUp");
                  }
                }}
                fontFamily="bold"
                style={styles.signInLink}
              >
                Sign Up
              </CustomText>
            </CustomText>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingContainer>
  );
};

export default SignIn;
