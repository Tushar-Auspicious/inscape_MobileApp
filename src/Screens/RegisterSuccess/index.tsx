import React, { FC } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IMAGES from "../../Assets/images";
import CustomButton from "../../Components/Buttons/CustomButton";
import { CustomText } from "../../Components/CustomText";
import { RegisterSuccessProps } from "../../Typings/route";
import styles from "./style";

const RegisterSuccess: FC<RegisterSuccessProps> = ({ navigation }) => {
  const handleOk = () => {
    navigation.replace("otpScreen", { isFromForgotPassword: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={IMAGES.registerSuccessImg}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <CustomText type="subHeading" fontFamily="bold">
          Registration Successful!
        </CustomText>
        <CustomText style={styles.infoText}>
          If you do not receive an approval email in 48 hours, please contact
          us. The Contact us would be a link to an email support@inscape.life.
        </CustomText>
      </View>
      <CustomButton title="OK" onPress={handleOk} />
    </SafeAreaView>
  );
};

export default RegisterSuccess;
