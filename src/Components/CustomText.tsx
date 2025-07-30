import {
  StyleSheet,
  Text,
  type TextProps,
  PixelRatio,
  TextStyle,
} from "react-native";
import COLORS from "../Utilities/Colors";
import { responsiveFontSize } from "../Utilities/Metrics";
import { FontFamilyType, getPlatformFont } from "../Assets/fonts";

export type CustomTextProps = TextProps & {
  color?: string;
  fontFamily?: FontFamilyType;
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
  fontFamily = "regular",
  color = COLORS.white,
  type = "default",
  ...rest
}: CustomTextProps) {
  const systemScale = PixelRatio.getFontScale(); // e.g. 2.0
  const maxScale = 1.2;
  const cappedScale = Math.min(systemScale, maxScale);

  // Function to calculate lineHeight based on final fontSize
  const calculateLineHeight = (fontSize: number) => Math.ceil(fontSize * 1.1);

  // Function to get base fontSize from type
  const getBaseFontSize = (): number => {
    switch (type) {
      case "heading":
        return styles.heading.fontSize;
      case "subHeading":
        return styles.subHeading.fontSize;
      case "title":
        return styles.title.fontSize;
      case "subTitle":
        return styles.subTitle.fontSize;
      case "small":
        return styles.small.fontSize;
      case "extraSmall":
        return styles.extraSmall.fontSize;
      case "default":
      default:
        return styles.default.fontSize;
    }
  };

  const finalFontSize = (getBaseFontSize() / systemScale) * cappedScale;
  const lineHeight = calculateLineHeight(finalFontSize);

  const textStyle: TextStyle = {
    color,
    fontFamily: getPlatformFont(fontFamily),
    fontSize: finalFontSize,
    lineHeight,
  };

  return <Text style={[textStyle, style]} {...rest} />;
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
