import React, { FC, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { fetchData, postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { setIsRegistered } from "../../Redux/slices/initialSlice";
import { useAppDispatch } from "../../Redux/store";
import {
  GetCompanyNamesApiResponse,
  SignUpresponse,
} from "../../Typings/apiTypes";
import { SignUpProps } from "../../Typings/route";
import STORAGE_KEYS from "../../Utilities/Constants";
import { isValidEmail } from "../../Utilities/Helpers";
import { verticalScale } from "../../Utilities/Metrics";
import { storeLocalStorageData } from "../../Utilities/Storage";
import styles from "./style";
import COLORS from "../../Utilities/Colors";

const SignUp: FC<SignUpProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    companyId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isCompaniesLoading, setIsCompaniesLoading] = useState(false);
  const [companySuggestions, setCompanySuggestions] = useState<
    GetCompanyNamesApiResponse[]
  >([]);
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<any>(null); // Ref for the company name input

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (fieldName === "companyName") {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }

      if (value.trim().length > 2) {
        setIsCompaniesLoading(true);
        fetchTimeoutRef.current = setTimeout(() => {
          getCompanyNames(value.trim());
        }, 500);
      } else {
        setCompanySuggestions([]);
        setIsCompaniesLoading(false);
      }
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!inputData.firstName.trim()) {
      Toast.show({ type: "error", text1: "First Name is required" });
      isValid = false;
      return isValid;
    }

    if (!inputData.lastName.trim()) {
      Toast.show({ type: "error", text1: "Last Name is required" });
      isValid = false;
      return isValid;
    }

    if (!inputData.companyName.trim()) {
      Toast.show({ type: "error", text1: "Company Name is required" });
      isValid = false;
      return isValid;
    }

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

    if (!inputData.confirmPassword.trim()) {
      Toast.show({ type: "error", text1: "Confirm Password is required" });
      isValid = false;
      return isValid;
    } else if (inputData.password !== inputData.confirmPassword) {
      Toast.show({ type: "error", text1: "Passwords do not match" });
      isValid = false;
      return isValid;
    }

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
        companyName: inputData.companyName.trim(),
        companyId: inputData.companyId,
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

        navigation.navigate("otpScreen", {
          isFromForgotPassword: false,
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
        text1: error.message || "Sign up failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCompanyNames = async (name: string) => {
    try {
      const response = await fetchData<GetCompanyNamesApiResponse[]>(
        `${ENDPOINTS.getCompanyNames}${name}`
      );

      if (response.data.success && response.data) {
        setCompanySuggestions(response.data.data);
      } else {
        setCompanySuggestions([]);
      }
    } catch (error) {
      console.log("Error fetching company names:", error);
    } finally {
      setIsCompaniesLoading(false);
    }
  };

  const handleCompanySelect = (data: GetCompanyNamesApiResponse) => {
    setInputData((prev) => ({
      ...prev,
      companyName: data.companyName,
      companyId: data.id,
    }));
    setShowCompanySuggestions(false);
    Keyboard.dismiss();
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
          keyboardShouldPersistTaps="handled" // Prevent keyboard dismissal on suggestion tap
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
              <View style={styles.companyInputAndSuggestionsWrapper}>
                <CustomInput
                  ref={inputRef}
                  value={inputData.companyName}
                  placeholder="Company Name"
                  onChangeText={(value) =>
                    handleInputChange("companyName", value)
                  }
                  onFocus={() => {
                    console.log("Company input focused");
                    setShowCompanySuggestions(true);
                  }}
                  onBlur={() => {
                    console.log("Company input blurred");
                    // Delay hiding suggestions to allow onPress to fire
                    setTimeout(() => setShowCompanySuggestions(false), 300);
                  }}
                />
                {showCompanySuggestions &&
                  inputData.companyName.trim().length > 0 && (
                    <ScrollView
                      style={styles.companySuggestionsWrapper}
                      nestedScrollEnabled={true}
                      keyboardShouldPersistTaps="always" // Ensure taps don't dismiss keyboard
                      showsVerticalScrollIndicator={false}
                    >
                      {isCompaniesLoading ? (
                        <ActivityIndicator
                          size="small"
                          color={COLORS.white}
                          style={styles.loadingIndicator}
                        />
                      ) : (
                        <>
                          {companySuggestions.length > 0 ? (
                            <FlatList
                              data={companySuggestions}
                              keyExtractor={(item) => item.id}
                              renderItem={({ item }) => (
                                <TouchableWithoutFeedback
                                  onPress={() => {
                                    console.log(
                                      "Tapped suggestion:",
                                      item.companyName
                                    );
                                    handleCompanySelect(item);
                                  }}
                                >
                                  <View style={styles.suggestionItem}>
                                    <CustomText>{item.companyName}</CustomText>
                                  </View>
                                </TouchableWithoutFeedback>
                              )}
                              style={styles.suggestionsList}
                              showsVerticalScrollIndicator={false}
                              keyboardShouldPersistTaps="always" // Add to FlatList as well
                            />
                          ) : (
                            <CustomText style={styles.noSuggestionsText}>
                              No companies found.
                            </CustomText>
                          )}
                        </>
                      )}
                    </ScrollView>
                  )}
              </View>
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
