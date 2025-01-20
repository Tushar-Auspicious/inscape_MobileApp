import { StyleSheet, Text, type TextProps } from "react-native";
import COLORS from "../Utilities/Colors";
import { responsiveFontSize } from "../Utilities/Metrics";

export type CustomTextProps = TextProps & {
  color?: string;
  fontFamily?:
    | "SF-Pro-Display-Black"
    | "SF-Pro-Display-Bold"
    | "SF-Pro-Display-Heavy"
    | "SF-Pro-Display-Light"
    | "SF-Pro-Display-Medium"
    | "SF-Pro-Display-Regular"
    | "SF-Pro-Display-Semibold"
    | "SF-Pro-Display-Thin"
    | "SF-Pro-Display-SemiUltralight";
  type?:
    | "heading"
    | "subHeading"
    | "title"
    | "subTitle"
    | "default"
    | "small"
    | "extraSmall";
};

export function CustomText({
  style,
  fontFamily = "SF-Pro-Display-Regular",
  color = COLORS.white,
  type = "default",
  ...rest
}: CustomTextProps) {
  // Function to calculate dynamic lineHeight based on fontSize
  const calculateLineHeight = (fontSize: number) => Math.ceil(fontSize * 1.1);

  return (
    <Text
      style={[
        { color, fontFamily },
        type === "heading"
          ? {
              ...styles.heading,
              lineHeight: calculateLineHeight(styles.heading.fontSize),
            }
          : undefined,
        type === "subHeading"
          ? {
              ...styles.subHeading,
              lineHeight: calculateLineHeight(styles.subHeading.fontSize),
            }
          : undefined,
        type === "title"
          ? {
              ...styles.title,
              lineHeight: calculateLineHeight(styles.title.fontSize),
            }
          : undefined,
        type === "subTitle"
          ? {
              ...styles.subTitle,
              lineHeight: calculateLineHeight(styles.subTitle.fontSize),
            }
          : undefined,
        type === "default"
          ? {
              ...styles.default,
              lineHeight: calculateLineHeight(styles.default.fontSize),
            }
          : undefined,
        type === "small"
          ? {
              ...styles.small,
              lineHeight: calculateLineHeight(styles.small.fontSize),
            }
          : undefined,
        type === "extraSmall"
          ? {
              ...styles.extraSmall,
              lineHeight: calculateLineHeight(styles.extraSmall.fontSize),
            }
          : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: responsiveFontSize(32),
  },
  subHeading: {
    fontSize: responsiveFontSize(24),
  },
  title: {
    fontSize: responsiveFontSize(18),
  },
  subTitle: {
    fontSize: responsiveFontSize(16),
  },
  default: {
    fontSize: responsiveFontSize(14),
  },
  small: {
    fontSize: responsiveFontSize(12),
  },
  extraSmall: {
    fontSize: responsiveFontSize(10),
  },
});
