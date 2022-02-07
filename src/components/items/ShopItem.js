import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import LorylistIcon from './../LorylistIcon'
import { useDispatch } from 'react-redux';
import { colors } from '../../assets/styles';

const ShopItem = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { shop, onPress, withArrow = false } = props;

  const address = shop => {
    return `${shop.street_house_number}, ${shop.zipcode} ${shop.city}`
  }

  return (
    <TouchableOpacity style={s.container} onPress={() => {
      onPress(shop)
      }}>
      <View style={s.imageWrapper}>
        {shop.logo && shop.logo.image && (
          <Image
            source={
              shop.logo &&
              shop.logo.image && {
                uri: shop.logo.image,
              }
            }
            containerStyle={s.imageContainer}
            placeholderStyle={s.imagePlaceholder}
            PlaceholderContent={
              shop.logo && shop.logo.image && <ActivityIndicator />
            }
            style={s.image}
            resizeMode="contain"
          />
        )}
        {(!(shop.logo && shop.logo.image)) && (
          <LorylistIcon name={'shop'} size={40} color={'black'} />
        )}
      </View>

      <View style={s.textContainer}>
        <Text style={s.name}>{shop.name}</Text>
        <Text style={s.address} numberOfLines={1} ellipsizeMode='tail'>{address(shop)}</Text>

        <View style={s.routeContainer}>
          <Text style={s.duration}>8 min</Text>
          <Text style={s.distance}>2,4 km</Text>
        </View>
      </View>

      {withArrow && (<LorylistIcon style={s.arrowIcon} name='chevron-right' size={12} color={colors.black} />)}
    </TouchableOpacity>
  );
});

export default ShopItem;

const s = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  // Image
  imageWrapper: {
    height: 65,
    width: 65,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: 'solid',
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    backgroundColor: colors.white,
  },
  imagePlaceholder: {
    backgroundColor: colors.white,
  },
  image: {
    width: 65,
    height: 65,
  },

  textContainer: {
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  name: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 14,
  },
  address: {
    fontFamily: 'CircularStd-Book',
    fontSize: 12,
  },

  // Route container
  routeContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  duration: {
    backgroundColor: colors.black,
    color: colors.white,
    fontFamily: 'CircularStd-Medium',
    fontSize: 12,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  distance: {
    color: colors.gray,
    fontFamily: 'CircularStd-Book',
    fontSize: 12,
    marginTop: 2,
  },

  // Arrow
  arrowIcon: {
    marginTop: 34,
  },
});
