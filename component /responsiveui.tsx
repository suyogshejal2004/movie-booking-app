import { Dimensions, PixelRatio } from 'react-native';

// Get screen width and height
const { width, height } = Dimensions.get('window');

// Base dimensions based on a standard device (iPhone X)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Horizontal scale
const scale = size => (width / BASE_WIDTH) * size;

// Vertical scale
const verticalScale = size => (height / BASE_HEIGHT) * size;

// Font scale with precision
const responsiveFontSize = size => {
  const scaleFactor = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
  return Math.round(PixelRatio.roundToNearestPixel(size * scaleFactor));
};

// Clamp utility (optional)
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Export object
const responsive = {
  // Width & Height
  width: size => scale(size),
  height: size => verticalScale(size),

  // Font
  fontSize: size => responsiveFontSize(size),
  clampFontSize: (size, min = 12, max = 26) =>
    clamp(responsiveFontSize(size), min, max),

  // Margin
  margin: size => scale(size),
  marginTop: size => verticalScale(size),
  marginBottom: size => verticalScale(size),
  marginLeft: size => scale(size),
  marginRight: size => scale(size),
  marginHorizontal: size => scale(size),
  marginVertical: size => verticalScale(size),

  // Padding
  padding: size => scale(size),
  paddingTop: size => verticalScale(size),
  paddingBottom: size => verticalScale(size),
  paddingLeft: size => scale(size),
  paddingRight: size => scale(size),
  paddingHorizontal: size => scale(size),
  paddingVertical: size => verticalScale(size),
  gap: size => scale(size),
  // Border Radius
  borderRadius: size => scale(size),
  borderWidth: size => scale(size),

  // Icon Size (optional helper)
  iconSize: size => scale(size),
};

export default responsive;
