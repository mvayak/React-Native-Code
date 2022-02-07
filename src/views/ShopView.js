import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Button as ElementsButton} from 'react-native-elements';
import Share from 'react-native-share';
import _ from 'lodash';

// Components
import LorylistIcon from './../components/LorylistIcon.js';
import ListDivider from './../components/content/ListDivider.js';
import ProductCollection from './../components/collections/ProductCollection.js';
import Description from './../components/content/Description.js';
// import LocationMap from './../components/content/LocationMap';
import FilterItem from './../components/items/FilterItem';

// Assets
import Colors from './../assets/styles/colors.js';

// Redux and Hooks
import * as service from '../state/utils/services';

function useServiceLoader(snapshot) {
  const [shop, setShop] = useState(snapshot);
  const [isLoadingShop, setIsLoadingShop] = useState(true);

  useEffect(() => {
    async function fetch() {
      setIsLoadingShop(true);

      const updatedShop = await service.loadShop(snapshot.id);
      if (updatedShop) {
        setShop(updatedShop);
      }
      setIsLoadingShop(false);
    }

    fetch();
  }, [snapshot.id, setShop, setIsLoadingShop]);

  return [shop, isLoadingShop];
}

// Main component
const ShopView = ({route, navigation}) => {
  const snapshot = route.params.shop;

  const [shop, isLoadingShop] = useServiceLoader(snapshot);

  // Navigation
  const {goBack} = navigation;

  // Share options
  const shareOptions = {
    title: 'Teilen',
    message:
      'Hey, ich habe den Laden "' + shop.name + '" hier bei lorylist gefunden.',
    url: 'https://lorylist.com/open/shops/' + shop.id,
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      scrollIndicatorInsets={{right: 1}}>
      <ElementsButton
        icon={
          <View style={styles.shareButtonInner}>
            <LorylistIcon name="share" size={20} color={Colors.black} />
          </View>
        }
        buttonStyle={styles.shareButton}
        containerStyle={styles.shareButtonContainer}
        iconContainerStyle={styles.shareButtonIconContainer}
        type="clear"
        onPress={() => Share.open(shareOptions)}
      />

      <ElementsButton
        icon={
          <View style={styles.closeButtonInner}>
            <LorylistIcon name="times" size={10} color={Colors.black} />
          </View>
        }
        buttonStyle={styles.closeButton}
        containerStyle={styles.closeButtonContainer}
        iconContainerStyle={styles.closeButtonIconContainer}
        type="clear"
        onPress={() => goBack()}
      />

      <Image
        style={styles.avatar}
        resizeMode={'contain'}
        source={
          shop.logo
            ? {uri: shop.logo.image}
            : require('./../assets/images/default-avatar.jpg')
        }
      />

      {/* Name */}
      <Text style={styles.name}>{shop.name}</Text>

      {/* Type */}
      <Text style={styles.shopType}>
        {shop.type === 'local' ? 'Lokaler Markt' : 'Online-Shop'}
      </Text>

      {/* Search in shop */}
      <FilterItem
        icon="search"
        title={
          shop.type === 'local'
            ? 'Markt durchsuchen'
            : 'Online-Shop durchsuchen'
        }
        subtitle=""
        withChevron={true}
        onPress={() =>
          navigation.navigate('ShopSearch', {
            shop: shop,
            is_external: true,
          })
        }
        hasBorderTop={true}
        containerStyle={styles.searchButton}
      />

      {!isLoadingShop ? (
        <View>
          {/* Address */}
          {shop.street_house_number && (
            <View style={{paddingHorizontal: 20}}>
              <Text style={styles.addressShopName}>{shop.name}</Text>
              <Text
                style={{
                  fontFamily: 'CircularStd-Book',
                  fontSize: 14,
                  color: 'rgb(90, 90, 92)',
                }}>
                {shop.street_house_number}
              </Text>
              <Text
                style={{
                  fontFamily: 'CircularStd-Book',
                  fontSize: 14,
                  color: 'rgb(90, 90, 92)',
                }}>
                {shop.zipcode} {shop.city}
              </Text>

              {/* <LocationMap shop={shop} /> */}
              <ListDivider simple />
            </View>
          )}

          {/* Description */}
          {shop.description && (
            <View style={{paddingHorizontal: 20}}>
              <Description title="Beschreibung" text={shop.description} />
              <ListDivider simple />
            </View>
          )}

          {/* Brands */}
          {shop.brands.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Geführte Marken</Text>
              {shop.brands.map(brand => (
                <Text
                  style={{
                    fontFamily: 'CircularStd-Book',
                    fontSize: 14,
                    marginTop: 25,
                  }}>
                  {brand.name}
                </Text>
              ))}
              <ListDivider simple />
            </>
          )}

          {/* Products */}
          {shop.products && shop.products.length > 0 && (
            <ProductCollection
              name="Produkte"
              products={shop.products}
              // shop={shop}
              style={styles.collection}
            />
          )}
        </View>
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </ScrollView>
  );
};

export default ShopView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingBottom: 120,
  },

  // Close button
  closeButton: {},
  closeButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonInner: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    paddingTop: 10,
  },

  // Share button
  shareButton: {},
  shareButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  shareButtonInner: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    paddingTop: 8,
    paddingLeft: 2,
  },

  // Avatar
  avatar: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white,
    marginTop: 60,
    marginBottom: 15,
  },

  // Name + brand name
  name: {
    fontFamily: 'CircularStd-Black',
    color: Colors.black,
    fontSize: 24,
    lineHeight: 32,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  // Shop type
  shopType: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'CircularStd-Book',
    color: Colors.gray,
    marginBottom: 20,
  },
  searchButton: {
    marginBottom: 20,
  },
  brandNamePrefix: {
    fontFamily: 'CircularStd-Book',
    color: Colors.gray,
    fontSize: 12,
  },
  brandName: {
    fontFamily: 'CircularStd-Medium',
    color: Colors.black,
    fontSize: 12,
    marginLeft: 20,
  },

  // Badge
  badgeContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  badge: {
    backgroundColor: Colors.lightBackground,
    height: 30,
    borderRadius: 8,
    paddingLeft: 7,
    paddingRight: 7,
  },
  badgeText: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: 'CircularStd-Medium',
  },

  // Nutritional values
  nutritionalValues: {
    marginLeft: 20,
    marginTop: 30,
  },

  // Divider
  divider: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },

  // Collection
  collection: {
    paddingHorizontal: 0,
  },

  // Description
  description: {
    marginLeft: 20,
    marginRight: 20,
  },

  // Address
  addressShopName: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 16,
    marginBottom: 10,
  },

  // Sections
  sectionTitle: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 16,
  },
});
