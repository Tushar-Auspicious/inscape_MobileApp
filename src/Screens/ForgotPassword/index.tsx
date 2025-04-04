import React, { FC, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import { ForgotPasswordProps } from "../../Typings/route";
import styles from "./style";
import COLORS from "../../Utilities/Colors";
import { patchData, postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import Toast from "react-native-toast-message";
import { isValidEmail } from "../../Utilities/Helpers";

const ForgotPassword: FC<ForgotPasswordProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!email.trim()) {
      Toast.show({ type: "error", text1: "Email is required" });
      return;
    }
    if (!isValidEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Please enter a valid email address",
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await postData(ENDPOINTS.forgotPassword, {
        email,
      });
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        navigation.navigate("otpScreen", { isFromForgotPassword: true, email });
      }
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.message || "Login failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingContainer backgroundColor={COLORS.darkBlue}>
      <SafeAreaView style={styles.container}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backArrowCont}
          >
            <CustomIcon Icon={ICONS.BackArrow} width={15} height={15} />
          </TouchableOpacity>
        )}

        <View style={styles.textContainer}>
          <CustomText type="subHeading" fontFamily="bold">
            Forgotten Password
          </CustomText>
          <CustomText>
            Please enter the email address that you used to create an account.
            We will send you an email to reset your password.
          </CustomText>
        </View>

        <CustomInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />

        <CustomButton
          isLoading={isLoading}
          title="Send email"
          onPress={handleContinue}
          style={styles.btn}
        />
      </SafeAreaView>
    </KeyboardAvoidingContainer>
  );
};

export default ForgotPassword;
