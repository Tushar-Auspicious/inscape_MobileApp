import React, { FC, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import LogOutModal from "../../Components/Modals/LogOutModal";
import { SettingScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import STORAGE_KEYS from "../../Utilities/Constants";
import { verticalScale } from "../../Utilities/Metrics";
import { deleteLocalStorageData } from "../../Utilities/Storage";
import styles from "./style";

const Settings: FC<SettingScreenProps> = ({ navigation }) => {
  const sheetRef = useRef<any>(null);

  const handleCancel = () => {
    sheetRef.current.close();
  };

  const handleLogout = async () => {
    await deleteLocalStorageData(STORAGE_KEYS.isAuth);
    await deleteLocalStorageData(STORAGE_KEYS.token);
    await deleteLocalStorageData(STORAGE_KEYS.isRegistered);

    navigation.replace("authStack", { screen: "signIn" });
    sheetRef.current.close();
    console.log("User logged out");
  };

  const renderBars = (title: string, onPress: () => void) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={{
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingVertical: verticalScale(10),
        }}
      >
        <CustomText type="subTitle" fontFamily="medium">
          {title}
        </CustomText>
        <CustomIcon Icon={ICONS.RightArrow} height={15} width={15} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.main}>
      <View style={styles.container}>
        <CustomText fontFamily="bold" type="title">
          Settings
        </CustomText>

        <View style={{ marginVertical: verticalScale(20) }}>
          {renderBars("My Account", () => navigation.navigate("myAccount"))}
          <View
            style={{
              backgroundColor: COLORS.mixGreyBlue,
              height: 1,
              marginVertical: verticalScale(30),
            }}
          />
          <CustomText fontFamily="bold" type="title">
            Support
          </CustomText>
          <View
            style={{ gap: verticalScale(10), marginTop: verticalScale(15) }}
          >
            {renderBars("FAQ", () => navigation.navigate("Faq"))}
            {renderBars("Privacy Policy", () =>
              navigation.navigate("settingsPrivacyPolicy")
            )}
            {renderBars("Terms & Conditions", () =>
              navigation.navigate("settingsTermsAndConditions")
            )}
            <TouchableOpacity
              style={{
                paddingVertical: verticalScale(10),
              }}
              onPress={() => sheetRef.current.open()}
              activeOpacity={0.8}
            >
              <CustomText
                style={{ textDecorationLine: "underline" }}
                fontFamily="bold"
              >
                Log out
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <LogOutModal
        sheetRef={sheetRef}
        onLogout={handleLogout}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
};

export default Settings;
