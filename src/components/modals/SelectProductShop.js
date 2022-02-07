import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Linking,
} from 'react-native';

import {Button as ElementsButton, ListItem} from 'react-native-elements';
import LorylistIcon from './../LorylistIcon.js';

import SearchBarButton from './../buttons/SearchBarButton.js';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-paper';

import colors from '../../assets/styles/colors.js';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {listSelectors, listOperations} from '../../state/ducks/lists';
import SwitchButtonGroup from './../buttons/SwitchButtonGroup';
import Helpers from './../../helpers.js';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Dimensions.get('window').height;

const SelectProductShop = ({reference}) => {
  const dispatch = useDispatch();
  const [shops, setShops] = useState([]);

  // Mode
  const [mode, setMode] = useState('local');
  const [modes, setModes] = useState([]);

  useEffect(() => {
    if (currentProduct) {
      let _modes = [];

      // Local
      const localCount = currentProduct.shops.filter(
        shop => shop.type === 'local',
      ).length;
      if (localCount > 0) {
        _modes.push({
          title: 'In der Nähe',
          value: 'local',
        });
      }

      // Online
      const onlineCount = currentProduct.shops.filter(
        shop => shop.type === 'online',
      ).length;
      if (onlineCount > 0) {
        _modes.push({
          title: 'Online',
          value: 'online',
        });
      }

      setModes(_modes);
    }
  }, [currentProduct]);

  const {currentProduct, isSelectProductShop} = useSelector(
    state => state.lists,
    shallowEqual,
  );

  const {isInList, isInShopId} = useSelector(state =>
    listSelectors.addProductButtonStates(state, currentProduct),
  );

  useEffect(() => {
    if (!currentProduct) {
      return;
    }

    const filteredShops = currentProduct.shops.filter(shop => {
      // console.log([shop.type, mode]);
      return shop.type === mode;
    });
    setShops(filteredShops);
  }, [currentProduct, mode, modes]);

  // OnSelectShop
  const _onSelectShop = shop => {
    const {id: shop_id} = shop;
    // if (isInShopId === shop_id) {
    //   return;
    // }

    // Online shop
    if (shop.type === 'online' && shop.absolute_shop_url) {
      Linking.openURL(shop.absolute_shop_url).catch(err =>
        console.error("Couldn't load page", err),
      );

      dispatch(listOperations.doHideMapProductShop());

      return;
    } else {
      dispatch(listOperations.doSetProductShop(currentProduct, shop));

      if (!isInList) {
        dispatch(listOperations.doAddToShoppingList(currentProduct));
      }

      dispatch(listOperations.doHideMapProductShop());
    }
  };

  return (
    <Portal>
      <Modalize
        ref={reference}
        modalStyle={styles.modal}
        onClosed={() => {
          dispatch(listOperations.doHideMapProductShop());
        }}
        adjustToContentHeight={true}>
        <View style={{paddingBottom: 40}}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Einkaufsort wählen</Text>
            <ElementsButton
              icon={<LorylistIcon name={'times'} size={12} color={'black'} />}
              iconContainerStyle={{marginLeft: 10}}
              buttonStyle={styles.bCloseButton}
              onPress={() => {
                dispatch(listOperations.doHideMapProductShop());
              }}
            />
          </View>

          {/* Switch */}
          <SwitchButtonGroup
            style={styles.switch}
            values={modes}
            handleUpdate={mode => {
              setMode(mode);
            }}
          />

          {currentProduct && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                {/* <SearchBarButton title="z.B. Stadt oder Post" /> */}
                <View>
                  {shops.map((item, index) => {
                    const {id: shop_id} = item;
                    return (
                      <ShopListItem
                        key={index}
                        shop={item}
                        isSelected={shop_id === isInShopId}
                        onSelect={_onSelectShop}
                      />
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </Modalize>
    </Portal>
  );
};

const ShopListItem = ({isSelected, shop, onSelect}) => {
  const _onSelect = () => onSelect(shop);
  return (
    <ListItem
      pad={16}
      containerStyle={{
        paddingHorizontal: 20,
      }}
      leftElement={
        <LorylistRadioButton
          containerStyle={styles.radioContainer}
          isSelected={isSelected}
          onPress={_onSelect}
        />
      }
      title={
        <View style={styles.shopMainContainer}>
          {shop.logo && shop.logo.image && (
            <Image
              source={{uri: shop.logo.image, cache: 'force-cache'}}
              style={{width: 40, height: 40, marginRight: 15}}
            />
          )}
          <View style={styles.shopTextContainer}>
            <View style={styles.shopInnerContainer}>
              <Text style={styles.shopName}>{shop.name}</Text>

              {/* Shop url */}
              {shop.shop_url && (
                <View>
                  <Text style={styles.shopAddress}>{shop.shop_url}</Text>
                </View>
              )}

              {/* Address */}
              {shop.street_house_number && (
                <View>
                  <Text style={styles.shopAddress}>
                    {shop.street_house_number}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.shopPrice}>
              {'€ ' + Helpers.format_price(shop.price)}
            </Text>
          </View>
        </View>
      }
      onPress={_onSelect}
    />
  );
};

const LorylistRadioButton = ({containerStyle, isSelected, onPress}) => {
  const isSelectedStyle = {
    backgroundColor: 'rgb(237, 56, 103)',
    borderColor: 'rgb(237, 56, 103)',
    shadowColor: 'rgba(237, 56, 103, 0.3)',
  };
  return (
    <ElementsButton
      containerStyle={containerStyle}
      buttonStyle={[
        {
          width: 25,
          height: 25,
          borderRadius: 25 / 2,
          borderWidth: 1,
          padding: 0,
          backgroundColor: 'white',
          borderColor: 'rgb(225, 230, 231)',
          shadowOffset: {width: 0, height: 1},
          shadowColor: 'rgba(0, 0, 0, 0.05)',
          shadowOpacity: 1,
          shadowRadius: 5,
        },
        isSelected && isSelectedStyle,
      ]}
      icon={
        isSelected && (
          <LorylistIcon
            name={'small-check'}
            color={'white'}
            style={{paddingTop: 5, paddingLeft: 1}}
          />
        )
      }
      onPress={onPress}
    />
  );
};

export default SelectProductShop;

const styles = StyleSheet.create({
  // list itme
  // Radio Button
  radioContainer: {
    borderColor: 'rgb(225, 230, 231)',
    borderWidth: 1,
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 1},
  },
  radioButton: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
  },
  // Shop Info Component
  shopMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  shopTextContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shopInnerContainer: {
    flexDirection: 'column',
  },
  shopPrice: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 14,
    lineHeight: 16,
  },
  shopRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopName: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 14,
    lineHeight: 16,
  },
  shopAddress: {
    fontFamily: 'CircularStd-Book',
    fontSize: 12,
    lineHeight: 16,
  },
  shopRatingNumber: {
    marginLeft: 3,
    fontFamily: 'CircularStd-Medium',
    fontSize: 12,
    color: 'rgb(20, 20, 23)',
  },
  shopTypeText: {
    fontFamily: 'CircularStd-Book',
    fontSize: 12,
    color: 'rgb(137, 137, 139)',
  },

  modal: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: screenHeight * 0.63,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
    // marginBottom: 10,
    paddingHorizontal: 20,
  },
  bCloseButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.lightBackground,
  },

  // Header
  title: {fontSize: 20, fontWeight: 'bold'},
  subtitle: {
    paddingHorizontal: 20,
    fontSize: 14,
    color: colors.lightGray,
  },

  // Switch
  switch: {
    width: screenWidth - 40,
    left: 10,
    marginTop: 10,
  },
});
