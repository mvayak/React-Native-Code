import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function LorylistHeader({onBackPress, title = '', background}) {
  return (
    <Header
      containerStyle={{borderBottomWidth: 0}}
      backgroundColor={background ? background : 'white'}
      leftComponent={
        <TouchableOpacity
          style={{width: 200}}
          underlayColor={'rgba(245,245,245,0.2)'}
          onPress={onBackPress}>
          <View
            style={[
              styles.leftContainer,
              onBackPress ? {} : styles.leftContainerSpace,
            ]}>
            {onBackPress && (
              <Icon name="chevron-left" size={19} style={styles.leftIcon} />
            )}
            <Text style={[styles.title]}>{title}</Text>
          </View>
        </TouchableOpacity>
      }
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 18,
  },
  leftContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  leftContainerSpace: {
    paddingLeft: 20,
  },
  leftIcon: {
    marginTop: 2,
    paddingLeft: 10,
    marginRight: 10,
  },
});
