import { BlurView } from "@react-native-community/blur";
import { FC, useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import ICONS from "../../Assets/icons";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import CustomIcon from "../CustomIcon";
import { CustomText } from "../CustomText";

type ContentCardProps = {
  imageUrl: string;
  title: string;
  duration: string;
  type?: "default" | "potrait";
  width?: number;
  height?: number;
  isSmall?: boolean;
  onPress: () => void;
  isCollection?: boolean;
};

const ICON_SIZE = horizontalScale(12);

const ContentCard: FC<ContentCardProps> = ({
  title,
  imageUrl,
  duration,
  type = "default",
  isSmall = false,
  width = wp(88),
  height = hp(Platform.OS === "ios" ? 23 : 25),
  onPress,
  isCollection = false,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Adjust width and height for portrait cards based on size
  if (type === "potrait") {
    if (isSmall) {
      width = wp(37);
      height = hp(Platform.OS === "ios" ? 20 : 22);
    } else {
      width = wp(51);
      height = hp(Platform.OS === "ios" ? 28 : 30);
    }
  }

  // Adjust title length based on card type and size
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

  // Define blur view height based on card type
  const blurViewHeight = type === "default" ? "36%" : "32%";

  return (
    <Animated.View
      style={[styles.cardContainer, { width, height }, { opacity: fadeAnim }]}
    >
      <FastImage
        source={{ uri: `${imageUrl}?width=200&height=200` }}
        style={[StyleSheet.absoluteFillObject, styles.backgroundImage]}
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
              style={[styles.blurView]}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
            <View style={[styles.content]}>
              <View style={styles.textContainer}>
                <CustomText
                  type={isSmall ? "default" : "subTitle"}
                  fontFamily="bold"
                >
                  {title}
                </CustomText>
                <View style={styles.infoRow}>
                  {!isCollection && (
                    <CustomIcon
                      Icon={ICONS.Clock}
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                    />
                  )}
                  <CustomText type="small" fontFamily="bold">
                    {duration}
                  </CustomText>
                </View>
              </View>
            </View>
          </>
        ) : (
          <BlurView
            style={{ height: blurViewHeight }}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
            overlayColor="transparent"
          >
            <TouchableOpacity style={styles.content} onPress={onPress}>
              <View style={styles.textContainer}>
                <CustomText
                  type={isSmall ? "default" : "subTitle"}
                  fontFamily="bold"
                >
                  {title}
                </CustomText>
                <View style={styles.infoRow}>
                  {!isCollection && (
                    <CustomIcon
                      Icon={ICONS.Clock}
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                    />
                  )}
                  <CustomText type="small" fontFamily="bold">
                    {duration}
                  </CustomText>
                </View>
              </View>
            </TouchableOpacity>
          </BlurView>
        )}
      </Pressable>
    </Animated.View>
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
          paddingHorizontal: horizontalScale(10),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "36%",
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
  textContainer: {
    justifyContent: "center",
    gap: verticalScale(10),
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
