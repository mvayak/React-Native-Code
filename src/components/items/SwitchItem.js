import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native';

// Components
import LorylistIcon from './../LorylistIcon';

import colors from './../../assets/styles/colors';

const SwitchItem = ({
  icon,
  iconSize,
  title,
  subtitle,
  active = false,
  withChevron = false,
  onToggle,
  state,
}) => {

  return (
    <View style={{ width: '100%' }}>
      <View style={styles.container}>
        {active && <View style={styles.activeDot}></View>}
        {icon && <LorylistIcon name={icon} size={iconSize ? iconSize : 18} color={colors.black} style={styles.icon} />}
        <View style={styles.textContainer}>
          {title && <Text ellipsizeMode={'tail'} numberOfLines={1} style={[styles.title, active ? styles.activeTitle : {}]}>{title}</Text>}
          {subtitle != '' && <Text ellipsizeMode={'tail'} numberOfLines={2} style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <Switch
          style={styles.toggle}
          onValueChange={onToggle}
          value={state}
        />
      </View>

      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    marginRight: 60,
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

  // Toggle
  toggle: {
    position: 'absolute',
    right: 20,
    top: 23,
  },

  textContainer: {
    flexDirection: 'column',
  },
});

export default SwitchItem;