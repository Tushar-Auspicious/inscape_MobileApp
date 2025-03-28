import React, { FC, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import CustomButton from "../../Components/Buttons/CustomButton";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import { CreateNewPasswordProps } from "../../Typings/route";
import styles from "./style";
import COLORS from "../../Utilities/Colors";
import { patchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import Toast from "react-native-toast-message";

const CreateNewPassword: FC<CreateNewPasswordProps> = ({
  navigation,
  route,
}) => {
  const { otp } = route.params;

  const [isLoading, setIsLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await patchData(ENDPOINTS.updatePAssword, {
        otp: otp,
        password: newPassword,
      });

      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        navigation.navigate("passwordSuccess");
      }
    } catch (error: any) {
      console.log(error, "SSSSS");
      Toast.show({
        type: "error",
        text1: error.message,
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
            <CustomIcon Icon={ICONS.BackArrow} height={15} width={15} />
          </TouchableOpacity>
        )}

        <View style={styles.textContainer}>
          <CustomText type="subHeading" fontFamily="bold">
            Create New Password
          </CustomText>
          <CustomText>
            Your new password must be different from your previously used
            password.
          </CustomText>
        </View>

        <View style={styles.inputCont}>
          <CustomInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            type="password"
          />

          <CustomInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm New Password"
            type="password"
          />
        </View>

        <CustomButton
          title="Reset Password"
          onPress={handleResetPassword}
          style={styles.btn}
          isLoading={isLoading}
        />
      </SafeAreaView>
    </KeyboardAvoidingContainer>
  );
};

export default CreateNewPassword;
