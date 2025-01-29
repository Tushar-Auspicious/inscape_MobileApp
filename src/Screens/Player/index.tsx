import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import styles from "./style";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import IMAGES from "../../Assets/images";
import { CustomText } from "../../Components/CustomText";
import { verticalScale } from "../../Utilities/Metrics";
import TrackPlayer from "../../Components/TrackPlayer";

const Player = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ImageBackground
        source={IMAGES.pinkBg}
        imageStyle={{
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
        style={styles.backgroundImage}
      />
      <View style={[styles.playerCont, { bottom: insets.bottom }]}>
        <Image
          source={IMAGES.curvedView}
          style={styles.curvedImage}
          resizeMode="contain"
        />
        <View style={{ gap: verticalScale(4) }}>
          <CustomText fontFamily="light">Universal Mantras</CustomText>
        </View>
        <CustomText fontFamily="semiBold" type="title">
          Sign Up
        </CustomText>
        <TrackPlayer />
      </View>
    </SafeAreaView>
  );
};

export default Player;
