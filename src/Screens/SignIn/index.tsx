import React, { FC, useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  View,
  Switch,
} from "react-native"; // Import Switch
import Toast from "react-native-toast-message";
import { postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import IMAGES from "../../Assets/images";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import { useAppSelector } from "../../Redux/store";
import { LoginResponse } from "../../Typings/apiTypes";
import { SignInProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import STORAGE_KEYS from "../../Utilities/Constants";
import { isValidEmail } from "../../Utilities/Helpers";
import {
  storeLocalStorageData,
  getLocalStorageData,
} from "../../Utilities/Storage"; // Import getLocalStorageData
import styles from "./style";
import { KeyboardScrollView } from "../../Components/KeyboardScrollView";

const SignIn: FC<SignInProps> = ({ navigation }) => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false); // New state for remember me

  const { isRegistered } = useAppSelector((state) => state.initial);

  // Load saved email and password when component mounts
  useEffect(() => {
    const loadRememberedCredentials = async () => {
      const savedEmail = await getLocalStorageData(
        STORAGE_KEYS.rememberedEmail
      );
      const savedPassword = await getLocalStorageData(
        STORAGE_KEYS.rememberedPassword
      ); // New: Get saved password

      if (savedEmail) {
        setInputData((prev) => ({ ...prev, email: savedEmail }));
        setRememberMe(true); // Set rememberMe to true if an email was found
      }
      if (savedPassword) {
        // Only set password if rememberMe is true from email
        // Or you can set it unconditionally if you always want password to be filled with email
        setInputData((prev) => ({ ...prev, password: savedPassword }));
      }
    };
    loadRememberedCredentials();
  }, []);

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;

    if (!inputData.email.trim()) {
      Toast.show({ type: "error", text1: "Email is required" });
      isValid = false;
      return isValid;
    } else if (!isValidEmail(inputData.email)) {
      Toast.show({
        type: "error",
        text1: "Please enter a valid email address",
      });
      isValid = false;
      return isValid;
    }

    // Password validation
    if (!inputData.password.trim()) {
      Toast.show({
        type: "error",
        text1: "Password is required",
      });
      isValid = false;
      return isValid;
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

      if (response.data.success) {
        await storeLocalStorageData(
          STORAGE_KEYS.token,
          response.data.data.token
        );

        // Store or remove email based on rememberMe state
        if (rememberMe) {
          await storeLocalStorageData(
            STORAGE_KEYS.rememberedEmail,
            inputData.email
          );
          await storeLocalStorageData(
            STORAGE_KEYS.rememberedPassword,
            inputData.password
          ); // New: Store password
        } else {
          await storeLocalStorageData(STORAGE_KEYS.rememberedEmail, "");
          await storeLocalStorageData(STORAGE_KEYS.rememberedPassword, ""); // New: Clear password
        }

        navigation.replace("mainStack", {
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
      if (error.message === "Please wait for the company's approval") {
        navigation.navigate("registerSuccess");
      } else {
        Toast.show({
          type: "error",
          text1: error.message || "Login failed",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("forgotPassword");
  };

  return (
    <KeyboardScrollView>
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

            {/* Remember Me Checkbox */}
            <View style={styles.rememberMeContainer}>
              <CustomText fontFamily="bold" color={COLORS.white}>
                Remember Me
              </CustomText>
              <Switch
                trackColor={{ false: COLORS.darkPink, true: COLORS.navyBlue }}
                thumbColor={rememberMe ? COLORS.white : COLORS.lightNavyBlue}
                ios_backgroundColor={COLORS.grey}
                onValueChange={() =>
                  setRememberMe((previousState) => !previousState)
                }
                value={rememberMe}
                style={{
                  transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                }}
              />
            </View>

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
                  navigation.navigate("signUp");
                }}
                fontFamily="bold"
              >
                Sign Up
              </CustomText>
            </CustomText>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardScrollView>
  );
};

export default SignIn;
