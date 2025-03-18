import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import COLORS from "../Utilities/Colors";
import { CustomText } from "./CustomText";
import CustomIcon from "./CustomIcon";
import ICONS from "../Assets/icons";
import { horizontalScale, verticalScale } from "../Utilities/Metrics";

const SPRING_CONFIG = {
  damping: 15,
  mass: 1,
  stiffness: 150,
};

const CustomAccordion = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animation = useSharedValue(0);

  const toggleAccordion = useCallback(() => {
    if (isOpen) {
      animation.value = withSpring(0, SPRING_CONFIG);
    } else {
      animation.value = withSpring(1, SPRING_CONFIG);
    }
    setIsOpen(!isOpen);
  }, [isOpen, animation]);

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        animation.value,
        [0, 1],
        [0, contentHeight],
        Extrapolate.CLAMP
      ),
      opacity: interpolate(
        animation.value,
        [0, 0.5, 1],
        [0, 0.3, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(
            animation.value,
            [0, 1],
            [0, 180],
            Extrapolate.CLAMP
          )}deg`,
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isOpen ? COLORS.darkNavyBlue : "transparent",
        { duration: 200 }
      ),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <TouchableOpacity
          onPress={toggleAccordion}
          activeOpacity={0.8}
          style={styles.headerContent}
        >
          <CustomText fontFamily="medium">{title}</CustomText>
          <Animated.View style={iconAnimatedStyle}>
            <CustomIcon Icon={ICONS.downArrowIcon} width={15} height={15} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        <View
          style={styles.measureContainer}
          onLayout={(event) => {
            setContentHeight(event.nativeEvent.layout.height);
          }}
        >
          <CustomText fontFamily="light" style={styles.contentText}>
            {content}
          </CustomText>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.white,
    overflow: "hidden",
  },
  header: {
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
  },
  content: {
    overflow: "hidden",
    backgroundColor: COLORS.darkNavyBlue,
  },
  measureContainer: {
    position: "absolute",
    width: "100%",
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
  },
  contentText: {
    lineHeight: 19,
  },
});

export default CustomAccordion;
