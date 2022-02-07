import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  Dimensions,
  Animated,
  Vibration,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import {
  ListItem,
  Button as ElementsButton,
  colors,
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

// Components
import ProductCard from './../cards/ProductCard';

// Assets
import Colors from './../../assets/styles/colors.js';
const screenWidth = Math.round(Dimensions.get('window').width);

import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { listSelectors, listOperations } from '../../state/ducks/lists';


// type Props = {};
export default function ProductCollection(props) {
  const dispatch = useDispatch();

  const [progress, setProgess] = useState(new Animated.Value(0));

  const handleScroll = ({ nativeEvent: { contentOffset, contentSize } }) => {
    let _progress =
      ((contentOffset.x - 20) / (contentSize.width - screenWidth)) * 100;

    if (_progress < 0) {
      _progress = 0;
    }
    if (_progress > 100) {
      _progress = 100;
    }

    setProgess(new Animated.Value(_progress));
  };

  // const currentList = useSelector(state =>
  //   listSelectors.currentShoppingList(state),
  // );

  const currentFavorites = useSelector(state =>
    listSelectors.currentFavoriteList(state),
  );

  const isFavorite = id => {
    if (!currentFavorites) {
      return false;
    }

    var found = _.find(currentFavorites.products, { id: id });

    if (found) {
      return true;
    }

    return false;
  };

  const {
    style,
    name,
    shop,
    products,
    hideShowAll = false,
    collection,
    brand,
    showShop = true,
    grid = 2,
    horizontal = true,
    withBorder = false,
    hideFavoriteIcon = false,
    headerLink = false,
  } = props;

  const renderItem = item =>
    ProductCard(
      {
        width: (screenWidth - 40) / grid,
        height: (screenWidth - 40) / grid,
      },
      item.item,
      0,
      isFavorite(item.item.id),
      () => {
        // navigate('Product', {
        //   product: item.item,
        // });
        navigate({
          name: 'Product', params: { product: item.item }, key: item.item.id + "_" + Math.random() * 10000,
        });
        // dispatch(listOperations.doTryAddProductToShoppingList(product));
      },
      null,
      // () => {
      //   Vibration.vibrate();
      //   dispatch(listOperations.doMapProductShop(product));
      // },
      () => {

        navigate({
          name: 'Product', params: { product: item.item }, key: item.item.id + "_" + Math.random() * 10000,
        });
        // navigate({
        //   name: 'Product', params: { product: item.item }, key: Math.random() * 10000,
        // });
        // navigate('Product', {
        //   product: item.item,
        // });
      },
      null,
      hideFavoriteIcon,
    );

  const containerStyle = style
    ? { ...styles.container, ...style }
    : styles.container;
  const { navigate } = useNavigation();

  return (
    <View
      style={[
        withBorder ? styles.borderStyle : null,
        { paddingHorizontal: 20 },
        containerStyle,
      ]}>
      <TouchableOpacity
        style={styles.header}
        disabled={
          !(
            headerLink &&
            !hideShowAll &&
            name !== null &&
            !horizontal &&
            (collection || brand || shop)
          )
        }
        onPress={() => {
          if (collection) {
            navigate('CollectionSearch', {
              collection: collection,
            });
            return;
          }

          if (brand) {
            navigate('CollectionSearch', {
              brand: brand,
            });
            return;
          }

          if (shop) {
            navigate('CollectionSearch', {
              shop: shop,
            });
            return;
          }
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          {/* Name */}
          {name && (
            <Text style={styles.sectionText} numberOfLines={2}>
              {name}
            </Text>
          )}

          {/* Shop */}
          {shop && showShop && (
            <TouchableOpacity
              onPress={() =>
                navigate('Shop', {
                  shop: shop,
                })
              }
              style={styles.shopContainer}>
              <Image
                source={{
                  uri: shop.logo ? shop.logo.image + '?width=80' : null,
                }}
                resizeMode={'contain'}
                style={styles.shopLogo}
              />
              <Text style={styles.shopName}>{shop.name}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Show all button */}
        {!hideShowAll && horizontal && (collection || brand || shop) && (
          <ElementsButton
            title="Alle anzeigen"
            type="clear"
            buttonStyle={styles.showAllButton}
            titleStyle={styles.showAllButtonTitle}
            onPress={() => {
              if (collection) {
                navigate('CollectionSearch', {
                  collection: collection,
                  is_external: true,
                });
                return;
              }

              if (brand) {
                navigate('CollectionSearch', {
                  brand: brand,
                  is_external: true,
                });
                return;
              }

              if (shop) {
                navigate('CollectionSearch', {
                  shop: shop,
                  is_external: true,
                });
                return;
              }
            }}
          />
        )}
      </TouchableOpacity>

      <FlatList
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        removeClippedSubviews={true}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        data={products}
        numColumns={horizontal ? 1 : grid}
      />

      {/* Show all button */}
      {!hideShowAll &&
        name !== null &&
        !horizontal &&
        (collection || brand || shop) && (
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => {
              if (collection) {
                navigate('CollectionSearch', {
                  collection: collection,
                });
                return;
              }

              if (brand) {
                navigate('CollectionSearch', {
                  brand: brand,
                });
                return;
              }

              if (shop) {
                navigate('CollectionSearch', {
                  shop: shop,
                });
                return;
              }
            }}>
            <Text style={styles.bottomButtonTitle}>Alle anzeigen</Text>
          </TouchableOpacity>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  borderStyle: {
    borderTopWidth: 4,
    borderTopColor: Colors.border,
    paddingVertical: 20,
  },
  sectionText: {
    marginBottom: 10,
    marginRight: 30,
    fontSize: 16,
    paddingLeft: 20,
    fontFamily: 'CircularStd-Bold',
    flexShrink: 1,
  },
  contentContainerStyle: {
    paddingLeft: 20,
  },

  // Shop
  shopContainer: {
    flexDirection: 'column',
    paddingRight: 20,
    alignItems: 'flex-end',
  },
  shopLogo: {
    height: 30,
    width: 50,
  },
  shopName: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 12,
    color: Colors.gray,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Show all button
  showAllButton: {
    width: 113,
    paddingRight: 20,
    marginTop: -10,
  },
  showAllButtonTitle: {
    color: Colors.gray,
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
  },

  // Bottom button
  bottomButton: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: -20,
  },
  bottomButtonTitle: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 16,
    color: Colors.green,
  },
});
