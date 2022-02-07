import React from 'react';
import {Button as ElementsButton} from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Animated,
  TouchableHighlight,
} from 'react-native';
import LorylistIcon from './../LorylistIcon';

export default function LorylistRadioButton({
  containerStyle,
  isSelected,
  onPress,
}) {
  const isSelectedStyle = {
    backgroundColor: 'rgb(237, 56, 103)',
    borderColor: 'rgb(237, 56, 103)',
    shadowColor: 'rgba(237, 56, 103, 0.3)',
  };
  return (
    <ElementsButton
      containerStyle={containerStyle}
      buttonStyle={[
        {
          width: 25,
          height: 25,
          borderRadius: 25 / 2,
          borderWidth: 1,
          padding: 0,
          backgroundColor: 'white',
          borderColor: 'rgb(225, 230, 231)',
          shadowOffset: {width: 0, height: 1},
          shadowColor: 'rgba(0, 0, 0, 0.05)',
          shadowOpacity: 1,
          shadowRadius: 5,
        },
        isSelected && isSelectedStyle,
      ]}
      icon={
        isSelected && (
          <LorylistIcon
            name={'small-check'}
            color={'white'}
            style={{paddingTop: 5, paddingLeft: 1}}
          />
        )
      }
      onPress={onPress}
    />
  );
}
