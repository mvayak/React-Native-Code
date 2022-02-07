export default {
  primary: '#71B62E', // More modern: 27AE60
  secondary: '#ED3867',
  tertiary: '#393664',
  white: '#ffffff',
  black: '#2B2B2E',
  gray: '#89898B',
  lightGray: '#A1A1A2',
  green: '#71B62E',
  lightBackground: '#F0F2F3',
  lightBackgroundActive: '#E1E6E7',
  divider: '#E9EAEE',
  border: '#E9EAEE',
  blackBorder: '#1D1D20',
  placeholder: '#B8B8B9',

  lightSuccess: '#F0F7EA',
  lightWarning: '#FFE5B6',

  offerBackground: 'rgba(237, 56, 103, 0.05)',

  inputBackground: '#F4F4F6',

  success: '#71B62E',
  danger: '#ED3867',
  warning: '#FFAA0C',

  rgba(hex, opacity) {
    hex = hex.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';

    return result;
  },

  opacity(color, opacityValue) {
    const opacityValueMixed = Math.floor(0.1 * opacityValue * 255).toString(16);

    return color + opacityValueMixed;
  },
};
