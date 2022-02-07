import React, {Component} from 'react';
import {Button as ElementsButton} from 'react-native-elements';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Assets
import Colors from './../../assets/styles/colors.js';

const LocationSelectButton = ({location}) => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.locationSelectContainer}>
      <Text style={styles.locationText}>
        {location && location.name ? location.name : 'Keine Stadt'}
      </Text>
      <View style={{width: 10}} />
      <ElementsButton
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        title="Ort ändern"
        onPress={() => navigate('ChangeLocation')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // container
  locationSelectContainer: {
    flexDirection: 'row',
    margin: 20,
    marginBottom: 0,
  },

  // selected city text
  locationText: {
    marginTop: 7,
    fontSize: 18,
    fontFamily: 'CircularStd-Bold',
  },

  // button style
  button: {
    width: 100,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: Colors.lightBackground,
    borderRadius: 16,
  },
  buttonTitle: {
    color: Colors.black,
    fontSize: 13,
    fontFamily: 'CircularStd-Bold',
  },
});

export default LocationSelectButton;
