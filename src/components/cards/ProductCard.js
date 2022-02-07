import React, { useEffect } from 'react';
import { Image, colors, Badge } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Vibration,
  ImageBackground,
} from 'react-native';
import Colors from './../../assets/styles/colors.js';
import Helpers from './../../helpers.js';
import LorylistIcon from './../LorylistIcon';
import ProgressiveImage from '../ProgressiveImage.js';

export default function ProductCard(
  size,
  product,
  quantity,
  isFavorite,
  onPress,
  onLongPress,
  onInfoPress,
  onMinusPress,
  hideFavoriteIcon = false,
) {
  const imageSize = {
    width: size && size.width ? size.width - 10 : 100,
    height: size && size.height ? size.height - 10 : 100,
  };

  return (
    <View
      key={'lastSeenProduct_' + product.id}
      style={{
        ...styles.container,
        ...{ width: size && size.width ? size.width : 100 },
      }}>
      {/* New badge */}
      {product && product.is_new && <Text style={styles.newBadge}>Neu</Text>}

      <TouchableOpacity
        // activeOpacity={1}
        underlayColor={Colors.white}
        onPress={onPress}
        onLongPress={onLongPress}>
        <TouchableOpacity style={{ zIndex: 9 }} onPress={onMinusPress}>
          {quantity > 0 && <Text style={styles.quantity}>{quantity}</Text>}
        </TouchableOpacity>

        {/* Add button */}
        {/* <AddToShoppingListButton
            title="+"
            containerStyle={styles.addButtonContainer}
            buttonStyle={styles.addButton}
            titleStyle={styles.addButtonTitle}
            // onPress={_onPressAdd}
            product={product}
          /> */}
        {/* <ElementsButton
            title="+"
            containerStyle={styles.addButtonContainer}
            buttonStyle={styles.addButton}
            titleStyle={styles.addButtonTitle}
            onPress={_onPressAdd}
          /> */}

        {/* Best offer */}
        {product.bestOffer && product.bestOffer.price && (
          <View style={styles.priceWrapper}>
            {/* Old price */}
            {product.bestOffer.price !== null && (
              <Text style={styles.oldPrice}>
                {'€ ' + Helpers.format_price(product.bestOffer.price)}
              </Text>
            )}
            {/* Price */}
            {product.bestOffer.offer_price !== null && (
              <Text style={styles.price}>
                {'€ ' + Helpers.format_price(product.bestOffer.offer_price)}
              </Text>
            )}
          </View>
        )}

        {/* Favorite */}
        {isFavorite && !hideFavoriteIcon && (
          <LorylistIcon
            name={'heart-filled'}
            color={Colors.secondary}
            size={20}
            style={styles.favorite}
          />
        )}

        {/* Image */}
        {product.images &&
          product.images.length > 0 &&
          product.images[0].image !== null ? (
          <>
            {product.images[0].image.split('.').slice(-1)[0] === 'jpg' ? (
              <ImageBackground
                source={{
                  uri:
                    product.images[0].image +
                    '?width=' +
                    imageSize.width * 0.2 +
                    '&height=' +
                    imageSize.height * 0.2,
                  cache: 'force-cache',
                }}
                style={[
                  { ...styles.image },
                  {
                    width: imageSize.width,
                    height: imageSize.height,
                    borderRadius: 8,
                    overflow: 'hidden',
                  },
                  ,
                ]}
                resizeMode={'contain'}
                blurRadius={1}>
                <ProgressiveImage
                  thumbnailSource={{
                    uri:
                      product.images[0].image +
                      '?width=10' +
                      ((product.images[0].is_cropped &&
                        product.images[0].is_cropped === false) ||
                        !product.images[0].is_cropped
                        ? ''
                        : '&height=10'),
                    cache: 'default',
                  }}
                  source={{
                    uri:
                      product.images[0].image +
                      '?width=' +
                      imageSize.width * 2 +
                      ((product.images[0].is_cropped &&
                        product.images[0].is_cropped === false) ||
                        !product.images[0].is_cropped
                        ? ''
                        : '&height=' + imageSize.height * 2),
                    cache: 'default',
                  }}
                  containerStyle={[
                    styles.imageContainer,
                    product.images[0].color
                      ? {
                        backgroundColor: Colors.rgba(
                          product.images[0].color,
                          0.1,
                        ),
                      }
                      : null,
                  ]}
                  placeholderStyle={styles.imagePlaceholder}
                  style={[
                    { ...styles.image },
                    product.images[0].scale
                      ? {
                        width: imageSize.width * product.images[0].scale,
                        height: imageSize.height * product.images[0].scale,
                      }
                      : { ...size },
                  ]}
                  PlaceholderContent={<ActivityIndicator />}
                  resizeMode={'contain'}
                />
              </ImageBackground>
            ) : (
              <View
                style={[
                  { ...imageSize },
                  styles.imageOuterContainer,
                  product.images[0].color
                    ? {
                      backgroundColor: Colors.rgba(
                        product.images[0].color,
                        0.1,
                      ),
                    }
                    : null,
                ]}>
                <ProgressiveImage
                  thumbnailSource={{
                    uri:
                      product.images[0].image +
                      '?width=10' +
                      ((product.images[0].is_cropped &&
                        product.images[0].is_cropped === false) ||
                        !product.images[0].is_cropped
                        ? ''
                        : '&height=10'),
                    cache: 'force-cache',
                  }}
                  source={{
                    uri:
                      product.images[0].image +
                      '?width=' +
                      imageSize.width * 2 +
                      ((product.images[0].is_cropped &&
                        product.images[0].is_cropped === false) ||
                        !product.images[0].is_cropped
                        ? ''
                        : '&height=' + imageSize.height * 2),
                    cache: 'force-cache',
                  }}
                  containerStyle={[
                    styles.imageContainer,
                    product.images[0].color
                      ? {
                        backgroundColor: Colors.rgba(
                          product.images[0].color,
                          0.1,
                        ),
                      }
                      : null,
                  ]}
                  placeholderStyle={styles.imagePlaceholder}
                  style={[
                    { ...styles.image },
                    product.images[0].scale
                      ? {
                        width: imageSize.width * product.images[0].scale,
                        height: imageSize.height * product.images[0].scale,
                      }
                      : { ...size },
                  ]}
                  PlaceholderContent={<ActivityIndicator />}
                  resizeMode={'contain'}
                />
              </View>
            )}
          </>
        ) : (
          <View
            style={[
              styles.noImage,
              { width: imageSize.width, height: imageSize.height },
            ]}>
            <Text style={styles.noImageText}>Kein Bild verfügbar.</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        // activeOpacity={1}
        underlayColor={Colors.white}
        onPress={onInfoPress}>
        {/* Product name */}
        <Text style={styles.title} numberOfLines={3} ellipsizeMode={'middle'}>
          {product.name}
        </Text>

        <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
          {/* Brand */}
          {product.brand && (
            <Text
              style={styles.brandTitle}
              numberOfLines={2}
              ellipsizeMode={'middle'}>
              {product.brand.name}
            </Text>
          )}
          {/* <LorylistIcon name="info-circle" style={styles.infoIcon} /> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: -5,
            marginBottom: 10,
          }}>
          {/* Price */}
          {product.price ? (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.price}>
                {'€ ' + Helpers.format_price(product.price)}
              </Text>

              {/* Base price */}
              {product.base_price && (
                <Text style={styles.basePrice}>
                  {'(' + Helpers.format_price(product.base_price)}
                  {' €'}/
                  {parseInt(product.base_unit_value, 10) === 1
                    ? ''
                    : product.base_unit_value + ' '}
                  {product.base_unit_type.display_name}
                  {')'}
                </Text>
              )}
            </View>
          ) : product && product.is_new ? (
            <View style={{ height: 30 }} />
          ) : null}

          {/* Unit */}
          {/* {typeof product.unit !== 'undefined' &&
            String(product.unit).trim().length > 0 && (
              <Badge
                value={product.unit}
                status="primary"
                badgeStyle={styles.badge}
                containerStyle={styles.badgeContainer}
                textStyle={styles.badgeText}
              />
            )} */}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    backgroundColor: Colors.white,
    // backgroundColor: 'red',
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: Colors.white,
  },
  pressedWrapper: {
    backgroundColor: Colors.lightBackground,
    borderColor: Colors.lightBackground,
  },

  // Image
  imageContainer: {
    // height: 100,
    // borderRadius: 8,
    // overflow: 'hidden',
  },
  imagePlaceholder: {
    backgroundColor: Colors.lightBackground,
    marginLeft: -5,
    borderRadius: 8,
  },
  image: {
    // width: 100,
    // height: 184,
    minHeight: 100,
  },
  imageOuterContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },

  // No image
  noImage: {
    backgroundColor: Colors.lightBackground,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    fontSize: 12,
    fontFamily: 'CircularStd-Book',
    color: Colors.lightGray,
    textAlign: 'center',
  },

  // Favorite
  favorite: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 999,
  },

  // Text
  title: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: 'CircularStd-Bold',
    lineHeight: 14,
    color: Colors.black,
  },
  brandTitle: {
    marginTop: 0,
    fontSize: 12,
    fontFamily: 'CircularStd-Book',
    color: Colors.gray,
  },

  // Badge
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 0,
  },
  badge: {
    backgroundColor: Colors.lightBackground,
    height: 20,
    borderRadius: 4.5,
    paddingLeft: 3,
    paddingRight: 3,
  },
  badgeActive: {
    backgroundColor: Colors.lightBackgroundActive,
  },
  badgeText: {
    color: Colors.black,
    fontSize: 10,
    fontFamily: 'CircularStd-Medium',
  },

  // Old price
  oldPrice: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 14,
    textAlign: 'right',
    borderRadius: 8,
    backgroundColor: Colors.secondary,
    color: Colors.white,
    paddingTop: 4,
    height: 26,
    overflow: 'hidden',
    paddingLeft: 5,
    paddingRight: 15,
    alignSelf: 'flex-end',
    zIndex: 2,
    marginBottom: -3,
    textDecorationLine: 'line-through',
  },

  // Price
  price: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 12,
    textAlign: 'left',
    color: Colors.black,
    marginRight: 3,
    marginTop: 8,
  },

  // Base price
  basePrice: {
    fontFamily: 'CircularStd-Book',
    fontSize: 10,
    textAlign: 'right',
    color: Colors.gray,
    alignSelf: 'flex-end',
  },

  // Add button
  addButtonContainer: {
    top: 0,
    right: 0,
    zIndex: 5,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  addButton: {
    width: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  addButtonTitle: {
    textAlign: 'center',
    fontFamily: 'CircularStd-Bold',
    color: Colors.white,
    fontSize: 23,
    fontWeight: '800',
  },

  // Quantity
  quantity: {
    position: 'absolute',
    width: 26,
    height: 26,
    right: 0,
    top: 0,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: Colors.secondary,
    textAlign: 'center',
    fontSize: 14,
    paddingHorizontal: 5,
    paddingVertical: 3,
    paddingTop: 4,
    color: Colors.white,
    fontFamily: 'CircularStd-Bold',
    fontWeight: '800',
    zIndex: 9,
  },

  // New badge
  newBadge: {
    position: 'absolute',
    height: 20,
    marginTop: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignSelf: 'baseline',
    overflow: 'hidden',
    backgroundColor: Colors.primary,
    textAlign: 'center',
    fontSize: 11,
    paddingHorizontal: 5,
    paddingVertical: 2,
    color: Colors.white,
    fontFamily: 'CircularStd-Bold',
    fontWeight: '800',
    zIndex: 9,
  },

  // Info icon
  infoIcon: {
    color: Colors.gray,
    marginLeft: 5,
    marginTop: 5,
  },
});
