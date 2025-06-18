import { RFValue } from "react-native-responsive-fontsize";
import { Dimensions, PixelRatio } from "react-native";

function getEstimatedPPI() {
  const { width, height } = Dimensions.get("screen");
  const scale = PixelRatio.get();

  const widthPx = width * scale;
  const heightPx = height * scale;

  const diagonalPx = Math.sqrt(widthPx ** 2 + heightPx ** 2);

  const estimatedInches = 6.1;

  return diagonalPx / estimatedInches;
}

function getFontMultiplier() {
  const ppi = getEstimatedPPI();

  if (ppi >= 380) return 1.0;
  return 1.1;
}

const multiplier = getFontMultiplier();

export const fontSizes = {
  "small-12": RFValue(12) * multiplier,
  "medium-16": RFValue(16) * multiplier,
  "xmedium-20": RFValue(20) * multiplier,
  "large-24": RFValue(24) * multiplier,
  "xlarge-32": RFValue(32) * multiplier,
  "xxlarge-40": RFValue(40) * multiplier,
};
