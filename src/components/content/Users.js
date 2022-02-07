import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from './../../assets/styles/colors.js';
import {Image} from 'react-native';

export default function Users({users, containerStyle, borderColor}) {
  return (
    <View style={[styles.smallUserImages, containerStyle]}>
      {users.map(user => {
        return (
          <Image
            style={[
              styles.smallUserImage,
              {
                borderColor: borderColor ? borderColor : colors.white,
              },
            ]}
            resizeMode={'center'}
            resizeMethod={'resize'}
            source={
              user && user.image
                ? {uri: user.image}
                : require('./../../assets/images/default-avatar.jpg')
            }
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  smallUserImages: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft: 15,
  },
  smallUserImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    marginLeft: -15,
    backgroundColor: colors.lightBackground,
    marginTop: 0,
    overflow: 'hidden',
  },
});
