import React, { FC } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IMAGES from "../../Assets/images";
import CustomButton from "../../Components/Buttons/CustomButton";
import { CustomText } from "../../Components/CustomText";
import { PasswordSuccessProps } from "../../Typings/route";
import styles from "./style";

const PasswordSuccess: FC<PasswordSuccessProps> = ({ navigation }) => {
  const handleOk = () => {
    navigation.replace("signIn");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={IMAGES.passwordSuccessImg}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <CustomText type="subHeading" fontFamily="bold">
          Success!
        </CustomText>
        <CustomText style={styles.infoText}>
          Your password has been changed.{"\n"}From now on use your new password
          to log in.
        </CustomText>
      </View>
      <CustomButton title="OK" onPress={handleOk} />
    </SafeAreaView>
  );
};

export default PasswordSuccess;
