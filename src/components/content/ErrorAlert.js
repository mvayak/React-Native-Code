import React from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';
import {Button} from 'react-native-elements';
import colors from './../../assets/styles/colors';

const ErrorAlert = ({title, info, onPressAgain, containerStyle}) => {
  return (
    <View style={[s.container, containerStyle]}>
      <Text style={s.title}>{title}</Text>
      <Text style={s.info}>{info}</Text>

      {onPressAgain && (
        <Button
          buttonStyle={s.button}
          titleStyle={s.buttonTitle}
          title={'Erneut versuchen'}
          onPress={onPressAgain}
        />
      )}
    </View>
  );
};

export default ErrorAlert;

const s = StyleSheet.create({
  container: {
    backgroundColor: colors.rgba(colors.lightWarning, 0.5),
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },

  // Title
  title: {
    fontFamily: 'CircularStd-Medium',
    color: colors.black,
    fontSize: 16,
  },

  // Info
  info: {
    marginTop: 5,
    fontFamily: 'CircularStd-Book',
    color: colors.black,
    fontSize: 14,
  },

  // Button
  button: {
    backgroundColor: 'transparent',
    marginTop: 10,
    padding: 0,
    justifyContent: 'flex-start',
  },
  buttonTitle: {
    color: colors.warning,
    fontFamily: 'CircularStd-Medium',
    fontSize: 16,
  },
});
