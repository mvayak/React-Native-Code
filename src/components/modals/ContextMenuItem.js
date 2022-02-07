import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// Components
import LorylistIcon from './../LorylistIcon';

import colors from './../../assets/styles/colors';

export default function ContextMenuItem({
  icon,
  title,
  active = false,
  onPress,
  right = null,
}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        {active && <View style={styles.activeDot} />}
        {icon && (
          <LorylistIcon
            name={icon}
            size={20}
            color={colors.black}
            style={styles.icon}
          />
        )}
        {title && (
          <Text style={[styles.title, active ? styles.activeTitle : {}]}>
            {title}
          </Text>
        )}
        {right}
      </TouchableOpacity>

      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 8,
    marginTop: 18,
  },
  title: {
    fontSize: 16,
    fontFamily: 'CircularStd-Book',
    marginTop: 19,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },

  // Active
  activeTitle: {
    fontFamily: 'CircularStd-Bold',
    color: colors.primary,
  },
  activeDot: {
    position: 'absolute',
    width: 6,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 5,
    left: -3,
    top: 8,
  },
});
