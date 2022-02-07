import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button as ElementsButton} from 'react-native-elements';

// Assets
import colors from './../../assets/styles/colors.js';

type Props = {};
export default class ActionButton extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      icon,
      style,
      buttonStyle,
      iconPosition,
      iconRight,
      iconContainerStyle,
      titleStyle,
      onPress,
      color,
      loading,
      disabled,
    } = this.props;
    const wrapperStyle = style
      ? {...styles.containerStyle, ...style}
      : styles.containerStyle;

    const defaultProps = {loading, disabled};

    var _buttonStyle = {...styles.buttonStyle, ...buttonStyle};
    var _titleStyle = {...styles.titleStyle, ...titleStyle};

    // Colors
    switch (color) {
      case 'primary':
        _buttonStyle = [
          _buttonStyle,
          styles.primaryButtonStyle,
          disabled ? styles.disabled : {},
        ];
        _titleStyle = [_titleStyle, styles.primaryTitleStyle];
        break;
      case 'outlinePrimary':
        _buttonStyle = [
          {...styles.outlineButtonStyle, ...buttonStyle},
          styles.outlinePrimaryButtonStyle,
          disabled ? styles.disabled : {},
        ];
        _titleStyle = [_titleStyle, styles.outlinePrimaryTitleStyle];
        break;
      case 'secondary':
        _buttonStyle = [
          _buttonStyle,
          styles.secondaryButtonStyle,
          disabled ? styles.disabled : {},
        ];
        _titleStyle = [_titleStyle, styles.secondaryTitleStyle];
        break;
    }

    return (
      <ElementsButton
        {...defaultProps}
        icon={icon}
        title={title}
        containerStyle={wrapperStyle}
        buttonStyle={_buttonStyle}
        titleStyle={_titleStyle}
        iconPosition={iconPosition}
        iconRight={iconRight}
        iconContainerStyle={iconContainerStyle}
        onPress={onPress}
      />
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    // marginRight: 10.5,
  },
  buttonStyle: {
    borderRadius: 12,
    backgroundColor: 'rgb(240, 242, 243)',
    height: 54,
  },
  outlineButtonStyle: {
    borderRadius: 12,
    backgroundColor: 'white',
    height: 54,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  titleStyle: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 16.2,
    color: 'rgb(53, 52, 67)',
  },

  // Primary
  primaryButtonStyle: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
    height: 56,

    // Shadow
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 9.11,

    elevation: 14,
  },
  primaryTitleStyle: {
    color: colors.white,
  },

  // Outline primary
  outlinePrimaryButtonStyle: {},
  outlinePrimaryTitleStyle: {
    color: colors.primary,
  },

  // Secondary
  secondaryButtonStyle: {
    backgroundColor: colors.secondary,
    borderColor: '#D72D59',
    borderWidth: 1,
    height: 56,

    // Shadow
    shadowColor: colors.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 9.11,

    elevation: 14,
  },
  secondaryTitleStyle: {
    color: colors.white,
  },

  // Disabled
  disabled: {
    borderWidth: 0,
    shadowOpacity: 0,
  },
});
