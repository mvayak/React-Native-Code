import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// Components
import LorylistIcon from './../LorylistIcon';

import colors from './../../assets/styles/colors';

const FilterItem = ({
  icon,
  containerStyle,
  iconSize,
  title,
  subtitle,
  count = null,
  active = false,
  withChevron = false,
  chevronDirection = 'right',
  onPress,
  hasBorderTop = false,
}) => {
  return (
    <View style={[{width: '100%'}, containerStyle]}>
      {hasBorderTop && <View style={styles.divider} />}

      <TouchableOpacity onPress={onPress} style={styles.container}>
        {active && <View style={styles.activeDot} />}
        {icon && (
          <LorylistIcon
            name={icon}
            size={iconSize ? iconSize : 18}
            color={colors.black}
            style={styles.icon}
          />
        )}
        <View style={styles.textContainer}>
          {title && (
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={[styles.title, active ? styles.activeTitle : {}]}>
              {title}
            </Text>
          )}
          {subtitle != '' && (
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </View>
        {count !== null && (
          <Text style={styles.count}>
            {count}
            {' ' + count === 1 ? 'Produkt' : 'Produkte'}
          </Text>
        )}
        {withChevron && (
          <LorylistIcon
            name={'chevron-' + chevronDirection}
            color={colors.black}
            size={12}
            style={styles.arrowRight}
          />
        )}
      </TouchableOpacity>

      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'CircularStd-Book',
    color: colors.black,
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
    top: 8,
  },

  // Count
  count: {
    fontFamily: 'CircularStd-Book',
    marginLeft: 'auto',
    marginRight: 40,
    color: colors.gray,
  },

  // Arrow
  arrowRight: {
    position: 'absolute',
    right: 20,
    top: 23,
  },

  textContainer: {
    flexDirection: 'column',
  },
});

export default FilterItem;
