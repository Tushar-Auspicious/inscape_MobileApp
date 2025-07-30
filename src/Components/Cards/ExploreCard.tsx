import { BlurView } from "@react-native-community/blur";
import React, { FC, useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import { CustomText } from "../CustomText";

type ExploreCardProps = {
  imageUrl: string;
  title: string;
  subTitle: string;
  onPress: () => void;
  width?: number;
  height?: number;
};

const ExploreCard: FC<ExploreCardProps> = ({
  imageUrl,
  title,
  subTitle,
  onPress,
  width = wp(48),
  height = hp(Platform.OS === "ios" ? 12 : 14),
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  return (
    <Animated.View
      style={[styles.cardContainer, { width, height }, { opacity: fadeAnim }]}
    >
      <FastImage
        source={{ uri: imageUrl }}
        style={[StyleSheet.absoluteFill, styles.backgroundImage]}
        resizeMode={FastImage.resizeMode.cover}
        onLoad={() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }}
      />
      <Pressable
        onPress={onPress}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        {Platform.OS === "ios" ? (
          <>
            <BlurView
              style={styles.blurView}
              blurType="light"
              blurAmount={5}
              reducedTransparencyFallbackColor="white"
            />
            <View style={styles.content}>
              <CustomText style={{ flex: 1 }} fontFamily="bold">
                {title}
              </CustomText>
              <CustomText type="extraSmall" fontFamily="bold">
                {subTitle}
              </CustomText>
            </View>
          </>
        ) : (
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={5}
            reducedTransparencyFallbackColor="rgba(255,255,255,.2)"
            overlayColor="transparent"
          >
            <TouchableOpacity style={styles.content} onPress={onPress}>
              <CustomText fontFamily="bold">{title}</CustomText>
              <CustomText type="extraSmall" fontFamily="bold">
                {subTitle}
              </CustomText>
            </TouchableOpacity>
          </BlurView>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default ExploreCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: verticalScale(10),
    borderRadius: verticalScale(10),
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
  },
  backgroundImage: {
    borderRadius: verticalScale(10),
  },
  blurView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: Platform.OS === "ios" ? "auto" : "36%",
    zIndex: 10,
  },
  content: {
    width: "100%",
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    justifyContent: "space-between",
    ...(Platform.OS === "ios" && {
      position: "absolute",
      bottom: 0,
      zIndex: 20,
    }),
  },
});
