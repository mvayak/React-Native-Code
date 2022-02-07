import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-elements'

// Components
import LorylistIcon from './../LorylistIcon';

import colors from './../../assets/styles/colors';

const HistoryItem = ({
  image,
  icon,
  iconSize,
  title,
  subtitle,
  active = false,
  onPress,
}) => {
  return (
    <View style={{ width: '100%' }}>
      <View style={styles.container}>
        {active && <View style={styles.activeDot}></View>}
        {icon && <LorylistIcon name={icon} size={iconSize ? iconSize : 18} color={colors.black} style={styles.icon} />}
        {image !== undefined && (
          <Image
            style={styles.image}
            source={{
              uri: image + '?width=80',
              cache: 'force-cache',
            }}
            width={80}
            height={80}
            resizeMode='contain' />
        )}
        <View style={styles.textContainer}>
          {title && <Text ellipsizeMode={'tail'} numberOfLines={1} style={[styles.title, active ? styles.activeTitle : {}]}>{title}</Text>}
          {subtitle != '' && <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={onPress}>
          <LorylistIcon name="times" color={colors.black} size={12} style={styles.arrowRight} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'CircularStd-Book',
    color: colors.black,
    marginRight: 100,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'CircularStd-Book',
    color: colors.gray,
    marginTop: 0,
    marginRight: 50,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },

  // Active
  activeTitle: {
    fontFamily: 'CircularStd-Bold',
    color: colors.secondary,
  },
  activeDot: {
    position: 'absolute',
    width: 6,
    height: 40,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    left: -3,
    top: 8
  },

  // Arrow
  arrowRight: {

  },

  textContainer: {
    flexDirection: 'column',
  },

  // Image
  image: {
    width: 46,
    height: 46,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 8,
  },

  // Delete button
  deleteButton: {
    position: 'absolute',
    right: -20,
    top: 3,
    height: 50,
    width: 50,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HistoryItem;