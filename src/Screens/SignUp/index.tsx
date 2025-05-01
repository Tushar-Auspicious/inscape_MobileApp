import React, { FC, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { SignUpProps } from "../../Typings/route";
import { verticalScale } from "../../Utilities/Metrics";
import styles from "./style";
import { convertDate, isValidEmail } from "../../Utilities/Helpers";
import Toast from "react-native-toast-message";
import { postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import { SignUpresponse } from "../../Typings/apiTypes";
import { storeLocalStorageData } from "../../Utilities/Storage";
import STORAGE_KEYS from "../../Utilities/Constants";
import { useAppDispatch } from "../../Redux/store";
import { setIsRegistered } from "../../Redux/slices/initialSlice";

const SignUp: FC<SignUpProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [birthDate, setBirthDate] = useState("");

  const [selectedGender, setSelectedGender] = useState<
    "Male" | "Female" | "Other"
  >("Male");

  const genderTypes: ("Male" | "Female" | "Other")[] = [
    "Male",
    "Female",
    "Other",
  ];

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // First Name validation
    if (!inputData.firstName.trim()) {
      Toast.show({ type: "error", text1: "First Name is required" });
      isValid = false;
      return isValid;
    }

    // Last Name validation
    if (!inputData.lastName.trim()) {
      Toast.show({ type: "error", text1: "Last Name is required" });
      isValid = false;
      return isValid;
    }

    // Company Name validation (optional, assuming it’s required here)
    if (!inputData.companyName.trim()) {
      Toast.show({ type: "error", text1: "Company Name is required" });
      isValid = false;
      return isValid;
    }

    // Email validation
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
      Toast.show({ type: "error", text1: "Password is required" });
      isValid = false;
      return isValid;
    } else if (inputData.password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Password must be at least 6 characters",
      });
      isValid = false;
      return isValid;
    }

    // Confirm Password validation
    if (!inputData.confirmPassword.trim()) {
      Toast.show({ type: "error", text1: "Confirm Password is required" });
      isValid = false;
      return isValid;
    } else if (inputData.password !== inputData.confirmPassword) {
      Toast.show({ type: "error", text1: "Passwords do not match" });
      isValid = false;
      return isValid;
    }

    // // Birth Date validation
    // if (!birthDate.trim()) {
    //   Toast.show({ type: "error", text1: "Birth Date is required" });
    //   isValid = false;
    //   return isValid;
    // }

    return isValid;
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await postData<SignUpresponse>(ENDPOINTS.signUp, {
        password: inputData.password,
        email: inputData.email,
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        // dob: convertDate(birthDate),
        // gender: selectedGender.toLowerCase(),
        companyName: inputData.companyName.trim(),
        isTermsAccepted: true,
      });

      if (response.data.success) {
        await storeLocalStorageData(STORAGE_KEYS.isRegistered, {
          registered: true,
          email: response.data.data.userData.email,
        });

        dispatch(
          setIsRegistered({
            registered: true,
            email: response.data.data.userData.email,
          })
        );

        navigation.replace("registerSuccess");
      } else {
        Toast.show({
          type: "error",
          text1: response.data.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Sign up failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.formContainer}>
            <CustomText fontFamily="bold" type="title">
              Sign Up
            </CustomText>
            <View style={styles.inputContainer}>
              <View style={styles.row}>
                <CustomInput
                  value={inputData.firstName}
                  placeholder="First Name"
                  onChangeText={(value) =>
                    handleInputChange("firstName", value)
                  }
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
                onChangeText={(value) =>
                  handleInputChange("companyName", value)
                }
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
              {/* <CustomInput
                value={birthDate}
                onChangeText={setBirthDate}
                placeholder="Birthday Date"
                type="date"
                heigth={50}
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
                        key={gender}
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

              <CustomButton
                title="Create account"
                onPress={handleContinue}
                style={{ marginTop: verticalScale(30) }}
                isLoading={isLoading}
              />
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
