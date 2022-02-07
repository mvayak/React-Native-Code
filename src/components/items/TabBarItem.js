import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {listSelectors} from '../../state/ducks/lists';
import {colors} from '../../assets/styles';
import LorylistIcon from './../LorylistIcon';
import Animated from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const TabBarIcon = React.forwardRef((props, ref) => {
  const {products} = useSelector(state =>
    listSelectors.currentFavoriteList(state),
  );

  const {focused, name} = props;

  let iconName;
  let label;
  let count = 0;
  switch (name) {
    case 'Home':
      iconName = 'discover';
      label = 'Entdecken';
      break;
    case 'Search':
      iconName = 'home';
      label = 'Suchen';
      break;
    case 'Shop':
      iconName = 'tiny-shop';
      label = 'Einkaufen';
      break;
    case 'ShoppingList':
      iconName = 'list';
      label = 'Einkaufsliste';
      break;
    case 'FavoriteList':
      iconName = 'heart';
      label = 'Merkliste';
      count = products.length;
      break;
    case 'Me':
      iconName = 'user';
      label = 'Ich';
      break;
  }

  // useEffect(() => {
  //   if (products.length > 0 && name === 'FavoriteList') {
  //     animateBadge();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [products]);

  // const badgeAnimation = new Animated.Value(0);
  // const animateBadge = () => {
  //   Animated.sequence([
  //     Animated.timing(badgeAnimation, {
  //       toValue: 1,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(badgeAnimation, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(badgeAnimation, {
  //       toValue: 1,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(badgeAnimation, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }),
  //   ]).start();
  // };

  return (
    <View style={[s.container, focused ? s.active : s.inactive]}>
      <LorylistIcon
        name={iconName}
        size={22}
        color={focused ? colors.primary : colors.black}
        style={s.icon}
      />

      {/* Count badge */}
      {count > 0 && <Text style={s.badge}>{count}</Text>}
      {/* <Text style={[s.label, focused ? s.activeLabel : s.inactiveLabel]}>
        {label}
      </Text> */}
    </View>
  );
});

export default TabBarIcon;

const s = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
    marginHorizontal: 10,
    paddingHorizontal: SCREEN_WIDTH <= 375 ? 20 : 30,
    height: 44,
    borderRadius: 22,
    paddingTop: 12,
  },
  inactive: {},
  active: {
    // backgroundColor: colors.rgba(colors.primary, 0.05),
  },
  label: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 13,
    bottom: 0,
  },
  activeLabel: {
    color: colors.primary,
  },
  inactiveLabel: {},
  icon: {
    zIndex: 99,
  },

  // Badge
  badge: {
    backgroundColor: colors.primary,
    color: colors.white,
    fontFamily: 'CircularStd-Bold',
    fontSize: 12,
    borderRadius: 11,
    textAlign: 'center',
    paddingTop: 1,
    position: 'absolute',
    overflow: 'hidden',
    height: 22,
    width: 28,
    borderWidth: 2,
    borderColor: colors.white,
    left: SCREEN_WIDTH / 3 / 3,
    zIndex: 100,
  },
});
