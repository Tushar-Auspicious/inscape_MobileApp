import { BlurView } from "@react-native-community/blur";
import React, { FC } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ICONS from "../../Assets/icons";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import { CustomText } from "../CustomText";
import CustomIcon from "../CustomIcon";

type ContentCardProps = {
  imageUrl: string;
  title: string;
  duration: string;
  rating: string;
  type?: "default" | "potrait";
  width?: number;
  height?: number;
  isSmall?: boolean;
  onPress: () => void;
};

const ICON_SIZE = horizontalScale(12);

const ContentCard: FC<ContentCardProps> = ({
  rating,
  title,
  imageUrl,
  duration,
  type = "default",
  isSmall = false,
  width = wp(88),
  height = hp(Platform.OS === "ios" ? 23 : 25),
  onPress,
}) => {
  // Adjust width and height for portrait cards based on size
  if (type === "potrait") {
    if (isSmall) {
      width = wp(37); // Custom width for portrait
      height = hp(Platform.OS === "ios" ? 20 : 22); // Custom height for portrait
    } else {
      width = wp(51); // Custom width for portrait
      height = hp(Platform.OS === "ios" ? 28 : 30); // Custom height for portrait
    }
  }

  // Adjust the title length based on card type and size
  title =
    type === "default"
      ? title.length > 30
        ? `${title.slice(0, 30)}...`
        : title
      : isSmall
      ? title.length > 10
        ? `${title.slice(0, 10)}...`
        : title
      : title.length > 15
      ? `${title.slice(0, 15)}...`
      : title;

  // Define the height of the blur view based on the card type
  const blurViewHeight = type === "default" ? "36%" : "32%";

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={[styles.cardContainer, { width, height }]}
        imageStyle={styles.backgroundImage}
      >
        {/* Blur Overlay */}

        {Platform.OS === "ios" ? (
          <>
            <BlurView
              style={[styles.blurView, { height: blurViewHeight }]}
              blurType="light"
              blurAmount={5}
              reducedTransparencyFallbackColor="white"
            />

            {/* Content */}
            <View
              style={[
                styles.content,
                {
                  height: blurViewHeight,
                },
              ]}
            >
              <View style={styles.textContainer}>
                <CustomText
                  type={isSmall ? "default" : "subTitle"}
                  fontFamily="bold"
                >
                  {title.slice(0, 20)}
                </CustomText>
                <View style={styles.infoRow}>
                  <CustomIcon
                    Icon={ICONS.Clock}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />
                  <CustomText type="small" fontFamily="bold">
                    {duration}
                  </CustomText>
                </View>
              </View>
              {type === "default" && (
                <View style={styles.ratingContainer}>
                  <CustomIcon
                    Icon={ICONS.Star}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />
                  <CustomText type="small" fontFamily="bold">
                    {rating}
                  </CustomText>
                </View>
              )}
            </View>
          </>
        ) : (
          <>
            <BlurView
              style={[styles.blurView, { height: blurViewHeight }]}
              blurType="light"
              blurAmount={5}
              reducedTransparencyFallbackColor="white"
            />

            {/* Content */}
            <View
              style={[
                styles.content,
                {
                  height: blurViewHeight,
                },
              ]}
            >
              <View style={styles.textContainer}>
                <CustomText
                  type={isSmall ? "default" : "subTitle"}
                  fontFamily="bold"
                >
                  {title.slice(0, 20)}
                </CustomText>
                <View style={styles.infoRow}>
                  <CustomIcon
                    Icon={ICONS.Clock}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />
                  <CustomText type="small" fontFamily="bold">
                    {duration}
                  </CustomText>
                </View>
              </View>
              {type === "default" && (
                <View style={styles.ratingContainer}>
                  <CustomIcon
                    Icon={ICONS.Star}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />
                  <CustomText type="small" fontFamily="bold">
                    {rating}
                  </CustomText>
                </View>
              )}
            </View>
          </>
        )}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default ContentCard;

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
    zIndex: 10,
  },

  content: {
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
  },
  textContainer: {
    justifyContent: "center",
    gap: verticalScale(5),
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(5),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(3),
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: verticalScale(6),
    padding: verticalScale(7),
  },
});
