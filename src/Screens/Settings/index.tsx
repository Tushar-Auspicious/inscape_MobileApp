import React, { FC } from "react";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/icons";
import IMAGES from "../../Assets/images";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import { SettingScreenProps } from "../../Typings/route";
import { verticalScale } from "../../Utilities/Metrics";
import styles from "./style";
import COLORS from "../../Utilities/Colors";

const Settings: FC<SettingScreenProps> = ({ navigation }) => {
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
        <CustomText type="subTitle" fontFamily="semiBold">
          {title}
        </CustomText>
        <CustomIcon Icon={ICONS.RightArrow} height={15} width={15} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.main}>
      <View style={styles.scrollContainer}>
        <ImageBackground
          source={IMAGES.pinkBg}
          style={styles.backgroundImage}
        />
        <View style={styles.container}>
          <Image
            source={IMAGES.curvedView}
            style={styles.curvedImage}
            resizeMode="contain"
          />
          <CustomText fontFamily="bold" type="title">
            Settings
          </CustomText>

          <View style={{ marginVertical: verticalScale(20) }}>
            {renderBars("My Account", () => navigation.navigate("myAccount"))}
            <View
              style={{
                backgroundColor: COLORS.mixGreyBlue,
                height: 1,
                marginVertical: verticalScale(20),
              }}
            />
            <CustomText fontFamily="bold" type="title">
              Support
            </CustomText>
            <View
              style={{ gap: verticalScale(10), marginTop: verticalScale(15) }}
            >
              {renderBars("FAQ", () => navigation.navigate("myAccount"))}
              {renderBars("Privacy Policy", () =>
                navigation.navigate("myAccount")
              )}
              {renderBars("Terms & Conditions", () =>
                navigation.navigate("myAccount")
              )}
            </View>
          </View>

          <TouchableOpacity>
            <CustomText
              style={{ textDecorationLine: "underline" }}
              fontFamily="bold"
              type="subTitle"
            >
              Log out
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
