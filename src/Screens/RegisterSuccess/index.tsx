import React, { FC, useEffect, useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IMAGES from "../../Assets/images";
import CustomButton from "../../Components/Buttons/CustomButton";
import { CustomText } from "../../Components/CustomText";
import { RegisterSuccessProps } from "../../Typings/route";
import styles from "./style";
import {
  deleteLocalStorageData,
  getLocalStorageData,
} from "../../Utilities/Storage";
import STORAGE_KEYS from "../../Utilities/Constants";
import COLORS from "../../Utilities/Colors";

const RegisterSuccess: FC<RegisterSuccessProps> = ({ navigation }) => {
  const [data, setData] = useState<any>(null);

  const handleOk = () => {
    navigation.replace("otpScreen", { isFromForgotPassword: false });
  };

  const getRegisteredData = async () => {
    const data = await getLocalStorageData(STORAGE_KEYS.isRegistered);

    setData(data);
    return data;
  };

  useEffect(() => {
    getRegisteredData();
  }, []);

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
        {data && data.email && (
          <CustomText color={COLORS.grey} style={styles.infoText}>
            {data.email}
          </CustomText>
        )}

        <CustomText style={styles.infoText}>
          If you do not receive an approval email in 48 hours, please contact us
          at support@inscape.life.
        </CustomText>
      </View>
      <CustomButton title="OK" onPress={handleOk} />
      <CustomText style={[styles.infoText]}>
        Not your email?.{" "}
        <CustomText
          onPress={async () => {
            await deleteLocalStorageData(STORAGE_KEYS.isRegistered);
            navigation.replace("signUp");
          }}
          fontFamily="bold"
          style={[styles.infoText, { textDecorationLine: "underline" }]}
        >
          Register here.
        </CustomText>
      </CustomText>
    </SafeAreaView>
  );
};

export default RegisterSuccess;
