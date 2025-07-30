import { Dimensions, PixelRatio } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Scaling functions
const horizontalScale = (size: number) =>
  (deviceWidth / guidelineBaseWidth) * size;

const verticalScale = (size: number) =>
  (deviceHeight / guidelineBaseHeight) * size;

const responsiveFontSize = (size: number) => {
  const factor = 0.5;
  return size + (horizontalScale(size) - size) * factor;
};

const deviceSpecificSize = (
  tabletSize: number,
  mobileSize: number,
  isTablet: boolean
) => {
  return isTablet ? tabletSize : mobileSize;
};

// Functions to calculate percentage-based dimensions
const wp = (widthPercent: string | number) => {
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((deviceWidth * elemWidth) / 100);
};

const hp = (heightPercent: string | number) => {
  const elemHeight =
    typeof heightPercent === "number"
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((deviceHeight * elemHeight) / 100);
};

const systemScale = PixelRatio.getFontScale();
const maxScale = 1.2;
const cappedScale = Math.min(systemScale, maxScale);

const getAdjustedFontSize = (baseSize: number) =>
  (baseSize / systemScale) * cappedScale;

export {
  deviceHeight,
  deviceSpecificSize,
  deviceWidth,
  horizontalScale,
  hp,
  responsiveFontSize,
  verticalScale,
  wp,
  getAdjustedFontSize,
};
