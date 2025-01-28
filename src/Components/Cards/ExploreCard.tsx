import { BlurView } from "@react-native-community/blur";
import React, { FC } from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={[
          styles.cardContainer,
          {
            width,
            height,
            justifyContent: "flex-end",
          },
        ]}
        imageStyle={styles.backgroundImage}
      >
        {Platform.OS === "ios" ? (
          <>
            <BlurView
              style={styles.blurView}
              blurType="light"
              blurAmount={5}
              reducedTransparencyFallbackColor="white"
              overlayColor="transparent"
            />

            {/* Content */}
            <View style={styles.content}>
              <CustomText fontFamily="bold">{title}</CustomText>
              <CustomText type="extraSmall" fontFamily="bold">
                {subTitle}
              </CustomText>
            </View>
          </>
        ) : (
          <BlurView
            blurType="light"
            blurAmount={5}
            reducedTransparencyFallbackColor="rgba(255,255,255,.2)"
            overlayColor="transparent"
          >
            {/* Content */}
            <View style={styles.content}>
              <CustomText fontFamily="bold">{title}</CustomText>
              <CustomText type="extraSmall" fontFamily="bold">
                {subTitle}
              </CustomText>
            </View>
          </BlurView>
        )}

        {/* Blur Overlay */}
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="rgba(255,255,255,.2)"
          overlayColor="transparent"
        >
          {/* Content */}
          <View style={styles.content}>
            <CustomText fontFamily="bold">{title}</CustomText>
            <CustomText type="extraSmall" fontFamily="bold">
              {subTitle}
            </CustomText>
          </View>
        </BlurView>
      </ImageBackground>
    </TouchableWithoutFeedback>
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
  blurView:
    Platform.OS === "ios"
      ? {
          position: "absolute",
          bottom: 0,
          width: "100%",
          zIndex: 10,
        }
      : {
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "36%",
        },

  content:
    Platform.OS === "ios"
      ? {
          position: "absolute",
          bottom: 0,
          width: "100%",
          zIndex: 20,
          paddingVertical: verticalScale(10),
          paddingHorizontal: horizontalScale(20),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }
      : {
          width: "100%",
          paddingVertical: verticalScale(10),
          paddingHorizontal: horizontalScale(10),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1,
        },
});
