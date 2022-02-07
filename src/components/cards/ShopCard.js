import React, {useState} from 'react';
import {Image} from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

// Redux
import {useDispatch} from 'react-redux';

// Components
import LorylistIcon from './../LorylistIcon.js';

// Assets
import Colors from './../../assets/styles/colors.js';

// Helpers
import {useNavigation} from '@react-navigation/native';
import Helpers from './../../helpers.js';

const ShopCard = ({shop, style, width}) => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [pressed, setPressed] = useState(false);

  const wrapperStyle = style
    ? {...styles.container, ...style}
    : styles.container;

  const _onHideUnderlay = () => {
    setPressed(false);
  };
  const _onShowUnderlay = () => {
    setPressed(true);
  };

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={Colors.white}
      onHideUnderlay={_onHideUnderlay.bind(this)}
      onShowUnderlay={_onShowUnderlay.bind(this)}
      onPress={() =>
        navigate('Shop', {
          shop: shop,
        })
      }>
      <View
        style={pressed ? [wrapperStyle, styles.pressedWrapper] : wrapperStyle}>
        <View style={styles.imageWrapper}>
          {shop.logo && shop.logo.image && (
            <Image
              source={
                shop.logo &&
                shop.logo.image && {
                  uri: shop.logo.image,
                }
              }
              containerStyle={styles.imageContainer}
              placeholderStyle={styles.imagePlaceholder}
              PlaceholderContent={
                shop.logo && shop.logo.image && <ActivityIndicator />
              }
              style={styles.image}
              resizeMode="contain"
            />
          )}
          {!(shop.logo && shop.logo.image) && (
            <LorylistIcon name={'shop'} size={40} color={'black'} />
          )}
        </View>

        {/* Name */}
        <Text style={styles.title} numberOfLines={2}>
          {shop.name}
        </Text>

        {/* Price */}
        {shop.price && (
          <Text style={styles.type}>
            {'€ ' + Helpers.format_price(shop.price)}
          </Text>
        )}

        {/* Base price */}
        {shop.base_price && (
          <Text style={styles.type}>
            {'€ ' + Helpers.format_price(shop.base_price)} /{' '}
            {shop.base_unit_value} {shop.base_unit_type.display_name}
          </Text>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderWidth: 5,
    borderColor: Colors.white,
  },
  pressedWrapper: {
    backgroundColor: Colors.lightBackground,
    borderColor: Colors.lightBackground,
  },

  // Image
  imageWrapper: {
    height: 105,
    width: 105,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    borderStyle: 'solid',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    backgroundColor: Colors.white,
  },
  imagePlaceholder: {
    backgroundColor: Colors.white,
  },
  image: {
    width: 85,
    height: 85,
  },

  // Text
  title: {
    width: 85,
    marginTop: 10,
    fontSize: 15,
    fontFamily: 'CircularStd-Bold',
    lineHeight: 21,
    color: Colors.black,
  },
  type: {
    marginTop: 0,
    fontSize: 12,
    fontFamily: 'CircularStd-Book',
    color: Colors.gray,
  },

  // Badge
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  badge: {
    backgroundColor: Colors.lightBackground,
    height: 24,
    borderRadius: 6.5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  badgeText: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: 'CircularStd-Medium',
  },

  // Price badge
  priceBadgeContainer: {
    top: 150,
    right: 10,
    zIndex: 1,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  priceBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    height: 24,
    borderRadius: 12,
    paddingLeft: 5,
    paddingRight: 5,
  },
  priceBadgeText: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'CircularStd-Bold',
  },
});

export default ShopCard;
