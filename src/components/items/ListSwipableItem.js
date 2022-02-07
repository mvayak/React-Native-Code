import React, { useState, useRef } from 'react';
import { Button as ElementsButton, Button } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  Easing,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LorylistIcon from './../LorylistIcon';
import FeatherIcon from 'react-native-vector-icons/Feather';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

import Interactable from 'react-native-interactable';

import { listOperations, listSelectors } from '../../state/ducks/lists';

import LorylistRadioButton from './../buttons/RadioButton';
import moment from 'moment';
import 'moment/locale/de';
moment.locale('de');

import { ls, colors } from '../../assets/styles';
import { commonOperations } from '../../state/ducks/common';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ListSwipableItem({
  swipable = true,
  product,
  showDivider = true,
  onSelect,
  onPressItem,
  onPressCustomProduct,
  didArchive = false,
  navigate,
}) {
  const [_deltaX] = useState(new Animated.Value(0));
  const [_deltaY] = useState(new Animated.Value(0));
  const [deleteFactor] = useState(new Animated.Value(0));
  const [showControls] = useState(new Animated.Value(0));
  const interactableRef = useRef();
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const dispatch = useDispatch();

  const { description, id, is_custom } = product;

  const customImage = useSelector(state =>
    listSelectors.customProductImage(id, state),
  );
  const { user } = useSelector(state => state.user);
  const { images: [{ image: productImage } = {}] = [] } = product;
  const image = productImage || customImage;

  const _onPressItem = () => {
    if (is_custom) {
      return onPressCustomProduct(product);
    }
    navigate('Product', {
      product: product,
    });
  };
  const onPressRadio = () => {
    onSelect(product);
  };

  const onPressPlus = () => {
    dispatch(listOperations.doAddToShoppingList(product));
  };
  const onPressMinus = () => {
    dispatch(listOperations.doRemoveFromShoppingList(product));
  };

  const deleteProduct = () => {
    Animated.timing(deleteFactor, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      dispatch(listOperations.doRemoveFromShoppingList(product, true));
    }, 300);
  };

  const onDrawerSnap = ({ nativeEvent: { index } }) => {
    setShowDeleteButton(false);

    if (index === 2) {
      setShowDeleteButton(true);
    }

    // Delete
    if (index === 3) {
      deleteProduct();
    }

    // Assign to person
    if (index === 1) {
      if (user && user.id) {
        if (product.assigned_to) {
          dispatch(listOperations.doReleaseCurrentUserFromProduct(product));
        } else {
          dispatch(listOperations.doAssignCurrentUserToProduct(product));
        }
      } else {
        dispatch(
          commonOperations.doSetSnackbar({
            title: 'Du musst angemeldet sein, um dir Produkte zuzuweisen.',
            delay: 10000,
            undoTitle: 'Okay',
            undo: () => { },
          }),
        );
      }

      interactableRef.current.snapTo({ index: 0 });
    }
  };

  return (
    <View
      style={[
        styles.container,
        !didArchive && product.checked_at && styles.containerOff,
        // {opacity: didArchive ? 1 : checked_at ? 0.8 : 1},
      ]}>
      {/* Animated view containing contents */}
      <Animated.View
        style={{
          backgroundColor: _deltaX.interpolate({
            inputRange: [-1, 1, SCREEN_WIDTH],
            outputRange: ['red', '#2E6BB6', '#2E6BB6'],
          }),
        }}>
        {/* Right Animated Button */}
        <View style={styles.animatedButtonWrapper}>
          <Animated.View
            style={[
              styles.button,
              styles.rightButton,
              {
                marginRight: 25,
                opacity: _deltaX.interpolate({
                  inputRange: [SCREEN_WIDTH * -1, -70, 0],
                  outputRange: [1, 1, 0],
                }),
                transform: [
                  {
                    scale: _deltaX.interpolate({
                      inputRange: [SCREEN_WIDTH * -1, -70, 0],
                      outputRange: [1, 1, 0],
                    }),
                  },
                ],
              },
            ]}>
            <LorylistIcon
              name={'trash'}
              size={20}
              color={'white'}
              style={ls.pt(3)}
            />
          </Animated.View>
        </View>
        {/* Left Animated Button */}
        <View style={styles.animatedButtonWrapper}>
          <Animated.View
            style={[
              styles.button,
              styles.leftButton,
              {
                marginLeft: 25,
                opacity: _deltaX.interpolate({
                  inputRange: [0, 70, SCREEN_WIDTH],
                  outputRange: [0, 1, 1],
                }),
                transform: [
                  {
                    scale: _deltaX.interpolate({
                      inputRange: [0, 70, SCREEN_WIDTH],
                      outputRange: [0, 1, 1],
                    }),
                  },
                ],
              },
            ]}>
            <LorylistIcon
              name={product.assigned_to ? 'remove-person' : 'add-person'}
              size={20}
              color={'white'}
              style={ls.pt(3)}
            />
          </Animated.View>
        </View>

        {showDeleteButton && (
          <TouchableOpacity
            onPress={deleteProduct}
            style={styles.deleteButton}
          />
        )}

        {/* Swipable View, containing product details and quantity buttons */}
        <Interactable.View
          ref={interactableRef}
          dragEnabled={swipable}
          horizontalOnly={true}
          snapPoints={[{ x: 0 }, { x: 70 }, { x: -70 }, { x: SCREEN_WIDTH * -1 }]}
          onSnap={onDrawerSnap}
          dragWithSpring={{
            tension: 1000,
            damping: 0.5,
          }}
          animatedValueX={_deltaX}
          animatedValueY={_deltaY}
          style={{
            height: deleteFactor.interpolate({
              inputRange: [0, 1],
              outputRange: [image ? 70 : 50, 0],
            }),
            opacity: deleteFactor.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}>
          <View
            style={[
              styles.itemContainer,
              styles.productContainer,
              image
                ? {
                  paddingVertical: 15,
                  height: 70,
                }
                : {
                  paddingVertical: 5,
                  height: 50,
                },
              showDivider && styles.itemContainerBorder,
            ]}>
            {/* Top Row of the contents */}
            <View
              style={[
                styles.infoContainer,
                // {opacity: didArchive ? 1 : checked_at ? 0.5 : 1},
              ]}>
              <View style={styles.topRowInnerContainer}>
                {/* Selection button */}
                {didArchive ? (
                  <Button
                    containerStyle={ls.MR15}
                    buttonStyle={styles.btnAdd}
                    icon={
                      <LorylistIcon
                        name="add-circle"
                        size={20}
                        color={colors.secondary}
                        onPress={onPressRadio}
                      />
                    }
                  />
                ) : (
                  <LorylistRadioButton
                    iconName={'plus'}
                    isSelected={product.checked_at}
                    onPress={onPressRadio}
                  />
                )}

                {/* Product text */}
                <TouchableOpacity
                  underlayColor={null}
                  disabled={product.is_custom && !onPressCustomProduct}
                  onPress={() =>
                    onPressItem !== undefined
                      ? onPressItem(product)
                      : _onPressItem()
                  }>
                  <View style={styles.infoInner}>
                    {/* Image */}
                    {image && (
                      <Image
                        source={{
                          uri: image,
                          cache: 'force-cache',
                        }}
                        style={styles.image}
                      />
                    )}

                    <View style={styles.textWrapper}>
                      {/* Name */}
                      <Text
                        style={styles.productName}
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {product.name}
                      </Text>

                      {/* Description */}
                      {description && (
                        <Text
                          style={styles.productSubtitle}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {description}
                        </Text>
                      )}

                      {(product.checked_at || product.deleted_at) && (
                        <Text style={styles.agoTimestamp}>
                          {product.checked_at
                            ? moment(product.checked_at).fromNow()
                            : moment(product.deleted_at).fromNow()}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Quantity Controls */}
              <View style={styles.productControls}>
                {/* Minus */}
                <AnimatedTouchable
                  onPress={onPressMinus}
                  style={[
                    styles.quantityButton,
                    styles.quantityButtonMinus,
                    {
                      opacity: showControls.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                      left: showControls.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -36],
                      }),
                      transform: [
                        {
                          scale: showControls.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                          }),
                        },
                      ],
                    },
                  ]}>
                  <LorylistIcon name="minus" size={3} color={colors.black} />
                </AnimatedTouchable>

                {/* Quantity count */}
                <AnimatedTouchable
                  onPress={() => {
                    // Prevent for checked or deleted products
                    if (product.deleted_at || product.checked_at) {
                      return;
                    }

                    if (showControls.__getValue() === 0) {
                      Animated.timing(showControls, {
                        toValue: 1,
                        duration: 300,
                        easing: Easing.bounce,
                      }).start();
                    } else {
                      Animated.timing(showControls, {
                        toValue: 0,
                        duration: 300,
                        easing: Easing.bounce,
                      }).start();
                    }
                  }}
                  style={[
                    styles.quantityCountButton,
                    {
                      backgroundColor: showControls.interpolate({
                        inputRange: [0, 1],
                        outputRange: [colors.lightBackground, colors.black],
                      }),
                      transform: [
                        {
                          scale: showControls.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0.9],
                          }),
                        },
                      ],
                    },
                  ]}>
                  <Animated.Text
                    style={[
                      styles.quantity,
                      {
                        color: showControls.interpolate({
                          inputRange: [0, 1],
                          outputRange: [colors.black, colors.white],
                        }),
                      },
                      ,
                    ]}>
                    {product.quantity}
                  </Animated.Text>
                </AnimatedTouchable>

                {/* Plus */}
                <AnimatedTouchable
                  onPress={onPressPlus}
                  style={[
                    styles.quantityButton,
                    styles.quantityButtonPlus,
                    {
                      opacity: showControls.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                      right: showControls.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -36],
                      }),
                      transform: [
                        {
                          scale: showControls.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                          }),
                        },
                      ],
                    },
                  ]}>
                  <LorylistIcon name="plus" size={12} color={colors.black} />
                </AnimatedTouchable>
              </View>
            </View>
          </View>
        </Interactable.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerOff: {
    opacity: 0.5,
  },

  animatedButtonWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  button: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  leftButton: {
    left: -25,
  },
  rightButton: {
    right: -25,
  },

  // Container
  itemContainer: {
    alignContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  itemContainerBorder: {
    borderColor: colors.white,
  },
  productContainer: {
    paddingLeft: 15,
    paddingRight: 40,
  },
  // Product Container
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  infoInner: {
    flexDirection: 'row',
    maxWidth: '100%',
    marginLeft: 5,
  },
  topRowInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    justifyContent: 'flex-start',
    flexGrow: 1,
    paddingRight: 30,
  },
  textWrapper: {
    marginTop: 0,
    paddingRight: 50,
    paddingLeft: 11,
    justifyContent: 'center',
  },

  // Image
  image: {
    height: 54,
    width: 54,
    borderRadius: 8,
    overflow: 'hidden',
  },

  // Avatar
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: colors.lightBackground,
    borderRadius: 15,
    marginRight: 10,
    alignSelf: 'center',
    marginLeft: 10,
  },

  // Product Controls
  productControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  quantityCountButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: colors.lightBackground,
  },
  quantity: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 15,
  },
  quantityButton: {
    position: 'absolute',
    zIndex: 1,
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(225, 230, 231, 1)',
  },
  // quantityButtonPlus: {
  //   right: -34,
  // },
  // quantityButtonMinus: {
  //   left: -34,
  // },

  // Text
  productName: {
    color: colors.black,
    fontSize: 15,
    fontFamily: 'CircularStd-Bold',
    lineHeight: 20,
    letterSpacing: 0,
    paddingRight: 20,
  },
  productSubtitle: {
    color: colors.black,
    fontSize: 12,
    fontFamily: 'CircularStd-Book',
    // lineHeight: 16,
    letterSpacing: 0,
    paddingRight: 20,
  },
  agoTimestamp: {
    color: colors.black,
    fontSize: 12,
    fontFamily: 'CircularStd-Book',
  },

  // Buttons
  btnAdd: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginLeft: -10,
    marginRight: -15,
  },

  deleteButton: {
    position: 'absolute',
    right: 0,
    width: 70,
    top: 0,
    bottom: 0,
    zIndex: 99,
  },
});
