import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Linking,
  RefreshControl,
  TextInput,
  Vibration,
  Platform,
} from 'react-native';
import { Button as ElementsButton } from 'react-native-elements';
import Share from 'react-native-share';
import _ from 'lodash';

const screenWidth = Math.round(Dimensions.get('window').width);
import Helpers from './../helpers.js';

// Components
import LorylistIcon from './../components/LorylistIcon.js';
import ActionButton from './../components/buttons/ActionButton.js';
import NutritionalValues from './../components/content/NutritionalValues.js';
import ListDivider from './../components/content/ListDivider.js';
import ProductCollection from './../components/collections/ProductCollection.js';
import ShopCollection from './../components/collections/ShopCollection.js';
import Ingredients from './../components/content/Ingredients.js';
import CarouselViewer from '../components/content/CarouselViewer.js';
import SignInPopup from './../components/modals/SignInPopup.js';
import ForgotPasswordPopup from './../components/modals/ForgotPasswordPopup.js';
import SignUpPopup from './../components/modals/SignUpPopup.js';
import FilterItem from './../components/items/FilterItem.js';

// Assets
import Colors from './../assets/styles/colors.js';

// Redux and Hooks
import { useDispatch, useSelector } from 'react-redux';
import * as service from './../state/utils/services';
import { productOperations, productActions } from './../state/ducks/product';
import { listSelectors, listOperations } from './../state/ducks/lists';
import { userOperations } from './../state/ducks/user';
import s from '../assets/styles/styles.js';
import ContextMenu from '../components/modals/ContextMenu.js';
import ContextMenuItem from '../components/modals/ContextMenuItem.js';
import { Portal } from 'react-native-paper';


// Main component
const ProductView = ({ route, navigation, item, lastPage = -1 }) => {
  const dispatch = useDispatch();
  const signInModal = useRef(null);
  const forgotPasswordModal = useRef(null);
  const signUpModal = useRef(null);
  const [isLoadingVote, setLoadingVote] = useState(false);
  const scrollView = useRef(null);

  const {
    user: { user, token },
    product: { showProductDetails, searchData, productPosition },
  } = useSelector(state => state);

  // route.params.product = item;
  route.params.product = (item) ? item : route.params.product;
  const snapshot = route.params.product;
  const voteModal = useRef();
  const [product, setProduct] = useState(snapshot);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isInformationVisible, setInformationVisible] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [selectedVariantOptions, setSelectedVariantOptions] = useState([]);

  const [currentOptionGroup, setCurrentOptionGroup] = useState();
  const selectVariantOptions = useRef();


  // View Detail title change variable
  const [detailTitle, setDetailTitle] = useState('Details anzeigen');

  // searchResult product images state
  const [productImage, setProductImages] = useState(() => {
    let imgs = productImages();
    return imgs;
  });

  // ScrollView Variant Ref

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endY, setEndY] = useState(0);
  const [endX, setEndX] = useState(0);

  useEffect(() => {
    if (item && lastPage === productPosition) {

      dispatch(productOperations.doAddToLastSeen(product));
    }
  }, [productPosition, product])

  const selectOption = (option, optionGroup) => {
    // Close modal
    if (selectVariantOptions.current) {
      selectVariantOptions.current.close();
    }

    // Filter all options from current group
    const groupOptions = Object.values(optionGroup.options).map(
      optionItem => optionItem.id,
    );
    let currentOptions = [...selectedVariantOptions].filter(optionItem => {
      return groupOptions.indexOf(optionItem) === -1;
    });

    // Push selected option
    currentOptions.push(option.id);

    setSelectedVariantOptions(currentOptions);
  };

  const variantOptionStock = (optionGroup, option) => {
    // Variants
    if (
      product.variants &&
      product.variants.variants &&
      product.variants.variants.length > 0
    ) {
      // Remove current option group from selectedVariantOptions
      const optionGroupOptionIds = optionGroup.options.map(option => option.id);
      const filteredVariantOptions = selectedVariantOptions.filter(
        option => optionGroupOptionIds.indexOf(option) === -1,
      );
      filteredVariantOptions.push(option.id);
      const currentVariant = product.variants.variants.filter(variant => {
        return (
          variant.options.sort().join(',') ===
          filteredVariantOptions.sort().join(',')
        );
      });

      if (currentVariant.length === 1) {
        return currentVariant[0].stock;
      }
    }

    return product.stock_quantity || 100;
  };

  const variantOptionAvailable = (optionGroup, option) => {
    return variantOptionStock(optionGroup, option) > 0;
  };

  const productPrice = () => {
    if (!product) {
      return 0.0;
    }

    // Variants
    if (
      product.variants &&
      product.variants.variants &&
      product.variants.variants.length > 0
    ) {
      const currentVariant = product.variants.variants.filter(variant => {
        return (
          variant.options.sort().join(',') ===
          selectedVariantOptions.sort().join(',')
        );
      });

      if (currentVariant.length === 1) {
        return currentVariant[0].price;
      }
    }

    return product.price;
  };

  const productAvailable = () => {
    if (!product) {
      return true;
    }

    // Variants
    if (
      product.variants &&
      product.variants.variants &&
      product.variants.variants.length > 0
    ) {
      const currentVariant = product.variants.variants.filter(variant => {
        return (
          variant.options.sort().join(',') ===
          selectedVariantOptions.sort().join(',')
        );
      });

      if (currentVariant.length === 1) {
        return currentVariant[0].is_available || false;
      }
    }

    return product.is_available || false;
  };

  function productImages() {
    if (!(product && product.images)) {
      return [];
    }

    // Variants
    if (
      product.variants &&
      product.variants.variants &&
      product.variants.variants.length > 0
    ) {
      const currentVariant = product.variants.variants.filter(variant => {
        return (
          variant.options.sort().join(',') ===
          selectedVariantOptions.sort().join(',')
        );
      });

      if (currentVariant.length === 1) {
        return currentVariant[0].images && currentVariant[0].images.length > 0
          ? currentVariant[0].images
          : product.images;
      }
    }

    return product.images;
  };


  useEffect(() => {

    // Set initial variant options
    setDetailTitle(showProductDetails === true ? "Details ausblenden" : "Details anzeigen");
    if (product && product.variants && product.variants.option_groups) {

      const arraySelection = [];
      product.variants.option_groups.map(
        optionGroup => {
          optionGroup.options.map(
            option => {
              if (variantOptionAvailable(optionGroup, option)) {
                if (arraySelection.length === 0) {
                  arraySelection.push(option.id);
                }
              }
            }
          )
        }
      );

      setSelectedVariantOptions(arraySelection);

      // );
    } else {
      setSelectedVariantOptions([]);
    }

  }, [product]);

  const onViewTouchStart = (e) => {
    if (lastPage >= 0) {
      setStartX(e.nativeEvent.pageX);
      setStartY(e.nativeEvent.pageY);
    }
  }

  const onViewTouchMove = (e) => {
    if (lastPage >= 0) {
      setEndX(e.nativeEvent.pageX);
      setEndY(e.nativeEvent.pageY);
    }
  }

  const onViewTouchCancel = (e) => {
    if (lastPage >= 0) {
      if (Platform.OS === 'android') {
        // if (startY > screenheight / 2) {
        if (lastPage === 0) {
          if ((startX) < (screenWidth / 2) && (endX * 2) > (screenWidth / 4)) {
            if (Math.abs((endY - startY)) < Math.abs(7)) {
              Vibration.vibrate(800);
            }
          }
        } else if (lastPage === (searchData.length - 1)) {
          if ((startX > (screenWidth / 2)) && (((startX - endX) * 2) < (screenWidth / 4))) {
            if (Math.abs((startY - endY)) < Math.abs(7)) {
              Vibration.vibrate(800);
            }
          }
        }
        // }
      } else if (Platform.OS === 'ios') {
        // if (startY > screenheight / 2) {
        if (lastPage === 0) {
          if ((startX) < (screenWidth / 2) && (endX) > (screenWidth / 4)) {
            if (Math.abs((endY - startY)) < Math.abs(7)) {
              Vibration.vibrate(800);
            }
          }
        } else if (lastPage === (searchData.length - 1)) {
          if ((startX > (screenWidth / 2)) && (((startX - endX)) < (screenWidth / 4))) {
            if (Math.abs((startY - endY)) < Math.abs(7)) {
              Vibration.vibrate(800);
            }
          }
        }
      }
    }
  }



  const ProductVariants = () => {
    return (
      <View style={styles.variantsContainer}
      >
        {product.variants.option_groups.map(group => (
          <View
            key={'group_' + group.id}
            style={styles.variantOptionGroupContainer}
            onStartShouldSetResponder={() => true}>
            <Text style={styles.variantOptionGroupName}>{group.name}</Text>

            {/* Color */}
            {group.type === 'color' && (
              <View style={styles.variantColorOptionsContainer}>
                {_.orderBy(
                  group.options,
                  [resultItem => variantOptionAvailable(group, resultItem)],
                  ['desc'],
                ).map(option => (
                  <TouchableOpacity
                    style={[
                      styles.variantColorOption,
                      selectedVariantOptions.indexOf(option.id) !== -1
                        ? styles.variantColorOptionSelected
                        : {},
                      { backgroundColor: option.color || '#000000' },
                      !variantOptionAvailable(group, option)
                        ? styles.variantColorOptionSoldOut
                        : {},
                    ]}
                    onPress={() => selectOption(option, group)}>
                    {selectedVariantOptions.indexOf(option.id) !== -1 && (
                      <LorylistIcon
                        name="small-check"
                        size={14}
                        color={Colors.white}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Button */}
            {group.type === 'button' && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={[
                  styles.variantButtonOptionsContainer,
                  styles.variantButtonOptionsScrollView,
                ]}>
                {_.orderBy(
                  group.options,
                  [resultItem => variantOptionAvailable(group, resultItem)],
                  ['desc'],
                ).map(option => (
                  <TouchableOpacity
                    key={'option_' + option.id}
                    style={[
                      styles.variantButtonOption,
                      variantOptionAvailable(group, option)
                        ? {}
                        : styles.variantButtonOptionSoldOut,
                      selectedVariantOptions.indexOf(option.id) !== -1
                        ? styles.variantButtonOptionSelected
                        : {},
                    ]}
                    onPress={() => selectOption(option, group)}>
                    <Text
                      style={[
                        styles.variantButtonOptionName,
                        variantOptionAvailable(group, option)
                          ? {}
                          : styles.variantButtonOptionNameSoldOut,
                        selectedVariantOptions.indexOf(option.id) !== -1
                          ? styles.variantButtonOptionNameSelected
                          : {},
                      ]}>
                      {option.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {/* Select */}
            {group.type === 'select' &&
              Object.values(group.options) &&
              Object.values(group.options).length > 0 && (
                <View style={styles.variantButtonOptionsContainer}>
                  {Object.values(group.options)
                    .filter(
                      option => selectedVariantOptions.indexOf(option.id) !== -1,
                    )
                    .map(option => (
                      <TouchableOpacity
                        style={styles.variantSelectOption}
                        onPress={() => {
                          setCurrentOptionGroup(group);

                          if (selectVariantOptions.current) {
                            selectVariantOptions.current.open();
                          }
                        }}>
                        <Text style={styles.variantSelectOptionName}>
                          {option.name}
                        </Text>

                        {!variantOptionAvailable(group, option) && (
                          <Text style={styles.variantSelectOptionSoldOut}>
                            ausverkauft
                          </Text>
                        )}
                      </TouchableOpacity>
                    ))}
                </View>
              )}
          </View>
        ))
        }
      </View >
    );
  }

  useEffect(() => {
    let isSubscribed = true;
    async function fetch() {
      if (!isSubscribed) {
        return;
      }

      setIsLoadingProduct(true);

      const updatedProduct = await service.loadProduct(snapshot.id);
      if (updatedProduct) {
        setProduct(updatedProduct);

        if (updatedProduct.min_quantity) {
          setQuantity(String(updatedProduct.min_quantity));
        }
        if (!item) {
          dispatch(productOperations.doAddToLastSeen(updatedProduct));
        };
      }
      setIsLoadingProduct(false);
    }

    fetch();

    return () => (isSubscribed = false);
  }, [snapshot.id, setProduct, setIsLoadingProduct, dispatch]);

  useEffect(() => {
    if (scrollView.current) {
      scrollView.current.scrollTo({
        offset: 0,
        animated: true,
      });
    }

  }, [product]);

  const refresh = async () => {
    setRefreshing(true);
    setIsLoadingProduct(true);

    const updatedProduct = await service.loadProduct(snapshot.id, true);
    if (updatedProduct) {
      setProduct(updatedProduct);

      if (!item) {
        dispatch(productOperations.doAddToLastSeen(updatedProduct));
      }
      let imgs = productImages();
      setProductImages(imgs);
    }

    setIsLoadingProduct(false);
    setRefreshing(false);
  };

  // Navigation
  const { goBack } = navigation;

  // Share options
  const shareOptions = {
    title: 'Teilen',
    message:
      'Hey, ich habe das Produkt "' +
      product.name +
      '" hier bei lorylist gefunden.\n' +
      'https://lorylist.com/products/' +
      product.id,
  };

  const isInFavoriteList = useSelector(state =>
    listSelectors.isProductInCurrentFavoriteList(state, product),
  );

  const onPressFav = () => {
    return dispatch(
      isInFavoriteList
        ? listOperations.doRemoveFromFavoriteList(product)
        : listOperations.doAddToFavoriteList(product),
    );
  };

  const onToggleDetails = () => {

    setDetailTitle(showProductDetails === true ? "Details anzeigen" : "Details ausblenden");
    dispatch(
      productActions.doSetShowProductDetails(
        showProductDetails === true ? false : true,
      ),
    );
  };

  const increaseQuantity = () => {
    const parsedQuantity = parseInt(quantity, 10);

    if (parsedQuantity < 999) {
      setQuantity(String(parsedQuantity + 1));
    }
  };
  const decreaseQuantity = () => {
    const parsedQuantity = parseInt(quantity, 10);

    if (product.min_quantity && parsedQuantity - 1 < product.min_quantity) {
      return;
    }

    if (parsedQuantity > 1) {
      setQuantity(String(parsedQuantity - 1));
    }
  };


  return (

    <View style={{ flex: 1 }}
    >
      <SignInPopup
        reference={signInModal}
        signUpReference={signUpModal}
        forgotPasswordReference={forgotPasswordModal}
        onClosed={() => {
          dispatch(userOperations.doOpenSignIn(false));
          signInModal.current.close();
        }}
      />
      <ForgotPasswordPopup
        reference={forgotPasswordModal}
        signInReference={signInModal}
        onClosed={() => {
          forgotPasswordModal.current.close();
        }}
      />
      <SignUpPopup
        reference={signUpModal}
        signInReference={signInModal}
        onClosed={() => {
          dispatch(userOperations.doOpenSignUp(false));
          signUpModal.current.close();
        }}
      />

      {/* Close button */}
      <ElementsButton
        icon={
          <View style={styles.closeButtonInner}>
            <LorylistIcon name="times" size={14} color={Colors.black} />
          </View>
        }
        buttonStyle={styles.closeButton}
        containerStyle={styles.closeButtonContainer}
        iconContainerStyle={styles.closeButtonIconContainer}
        type="clear"
        onPress={() => goBack()}
      />

      <ScrollView
        ref={scrollView}
        nestedScrollEnabled={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        scrollIndicatorInsets={{ right: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing && isLoadingProduct}
            onRefresh={refresh}
          />
        }>
        <View style={styles.content}>
          {String(product.name).length > 0 && (
            <View>
              <View style={styles.floatingButtons}>
                <ElementsButton
                  icon={
                    <LorylistIcon name="share" size={20} color={Colors.black} />
                  }
                  buttonStyle={styles.shareButton}
                  type="clear"
                  onPress={() => Share.open(shareOptions)}
                />

                {/* <ElementsButton
                  buttonStyle={styles.bookmarkButton}
                  icon={
                    <LorylistIcon
                      name={isInFavoriteList ? 'heart-filled' : 'heart'}
                      color={
                        isInFavoriteList === true
                          ? Colors.secondary
                          : Colors.black
                      }
                      size={20}
                    />
                  }
                  onPress={onPressFav}
                /> */}
              </View>

              {/* Images */}
              {productImage.length > 0 && (

                <CarouselViewer images={productImage} height={screenWidth} onChangeImage={(images, index) => {

                }} />
              )}

              {/* No images */}
              {productImage.length === 0 && (

                <View style={styles.noImage}>
                  <Text style={styles.noImageText}>Kein Bild verfügbar.</Text>
                </View>
              )}

              <View style={{ position: 'relative' }}>


                <View style={[styles.nameRow, { width: screenWidth }]}

                  onTouchStart={(e) => onViewTouchStart(e)}
                  onTouchMove={(e) => onViewTouchMove(e)}
                  onTouchCancel={(e) => onViewTouchCancel(e)}
                >
                  <View >
                    {/* Name */}
                    <Text
                      style={styles.name}
                      numberOfLines={3}
                      minimumFontScale={0.6}
                      adjustsFontSizeToFit={true}>
                      {product.name}
                    </Text>
                  </View>
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}>

                    {/* Brand */}
                    {product.brand && String(product.brand).length > 0 && (
                      <TouchableOpacity
                        style={styles.brandName}
                        onPress={() =>
                          navigation.navigate('Brand', { brand: product.brand })
                        }>
                        <Text style={styles.brandName}>
                          <Text style={styles.brandNamePrefix}>von </Text>
                          {product.brand.name}
                        </Text>
                      </TouchableOpacity>
                    )}

                    {/* Price */}
                    {product.price !== null && (
                      <View style={styles.priceWrapper}>
                        <Text style={styles.price}>
                          {/* <Text style={styles.priceUnit}>{product.unit}/ </Text> */}
                          {'€ ' + Helpers.format_price(productPrice())}
                        </Text>

                        {/* Base price */}
                        {product.base_price && (
                          <Text style={styles.basePrice}>
                            {'€ ' + Helpers.format_price(product.base_price)}/
                            {product.base_unit_value > 1
                              ? product.base_unit_value + ' '
                              : null}
                            {product.base_unit_type.display_name}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>

                </View>

                {product.variants &&
                  product.variants.option_groups &&
                  product.variants.option_groups.length > 0 &&
                  product.variants.option_groups[0].options && (
                    <>


                      <ProductVariants />
                      <View >
                        <Portal
                        >
                          <ContextMenu
                            reference={selectVariantOptions}
                            title={
                              currentOptionGroup
                                ? currentOptionGroup.name + ' wählen'
                                : ''
                            }
                            onClosed={() => {
                              // Close modal
                              if (selectVariantOptions.current) {
                                selectVariantOptions.current.close();
                              }
                            }}
                            fitContent={true}
                            renderContent={
                              currentOptionGroup
                                ? _.orderBy(
                                  Object.values(currentOptionGroup.options),
                                  [
                                    resultItem =>
                                      variantOptionAvailable(
                                        currentOptionGroup,
                                        resultItem,
                                      ),
                                  ],
                                  ['desc'],
                                ).map(option => (
                                  <ContextMenuItem
                                    title={option.name}
                                    active={
                                      selectedVariantOptions.indexOf(
                                        option.id,
                                      ) !== -1
                                    }
                                    right={
                                      !variantOptionAvailable(
                                        currentOptionGroup,
                                        option,
                                      ) ? (
                                        <Text
                                          style={[
                                            styles.variantSelectOptionSoldOut,
                                            {
                                              marginLeft: 'auto',
                                              alignSelf: 'center',
                                            },
                                          ]}>
                                          ausverkauft
                                        </Text>
                                      ) : null
                                    }
                                    onPress={() =>
                                      selectOption(option, currentOptionGroup)
                                    }
                                  />
                                ))
                                : null
                            }
                          />
                        </Portal>
                      </View>
                    </>
                  )}

                {/* Min quantity info */}
                {product.min_quantity > 1 && (
                  <View style={styles.minQuantityInfo}
                    onTouchStart={(e) => onViewTouchStart(e)}
                    onTouchMove={(e) => onViewTouchMove(e)}
                    onTouchCancel={(e) => onViewTouchCancel(e)}>
                    <LorylistIcon
                      name="info-circle"
                      color={Colors.primary}
                      size={14}
                    />
                    <Text style={styles.minQuantityTitle}>
                      Du musst mindestens {product.min_quantity} Stück
                      bestellen.
                    </Text>
                  </View>
                )}

                {/* Sold out */}
                {!productAvailable() && (
                  <View style={styles.soldOutInfo}
                    onTouchStart={(e) => onViewTouchStart(e)}
                    onTouchMove={(e) => onViewTouchMove(e)}
                    onTouchCancel={(e) => onViewTouchCancel(e)}>
                    <LorylistIcon
                      name="info-circle"
                      color={Colors.danger}
                      size={14}
                    />
                    <Text style={styles.soldOutTitle}>
                      Dieser Artikel ist leider ausverkauft.
                    </Text>
                  </View>
                )}

                {/* Shop button */}
                {product.shops && product.shops.length > 0 && (
                  <View onTouchStart={(e) => onViewTouchStart(e)}
                    onTouchMove={(e) => onViewTouchMove(e)}
                    onTouchCancel={(e) => onViewTouchCancel(e)}>
                    <ActionButton
                      color={'primary'}
                      buttonStyle={{ marginHorizontal: 20, marginTop: 20 }}
                      onPress={async () => {
                        if (product.shops.length > 1) {
                          dispatch(listOperations.doMapProductShop(product));
                        } else if (
                          product.shops.length === 1 &&
                          product.shops[0].links &&
                          product.shops[0].links.details
                        ) {
                          let productLink = product.shops[0].links.details;

                          // Find product link by selected variant
                          if (
                            product.variants &&
                            product.variants.variants &&
                            product.variants.variants.length > 0
                          ) {
                            const currentVariant = product.variants.variants.filter(
                              variant => {
                                return (
                                  variant.options.sort().join(',') ===
                                  selectedVariantOptions.sort().join(',') &&
                                  typeof variant.shops !== 'undefined'
                                );
                              },
                            );

                            if (currentVariant.length === 1) {
                              productLink =
                                currentVariant[0].shops[0].absolute_shop_url;
                            }
                          }


                          Linking.openURL(productLink).catch(err =>
                            console.error("Couldn't load page", err),
                          );

                        }

                      }}
                      title="Zum Online-Shop"
                      icon={
                        <LorylistIcon name="link" size={22} color="white" />
                      }
                      titleStyle={{ marginLeft: 5 }}
                    />

                    {product.shops.length > 0 &&
                      1 === 2 &&
                      product.shops[0].links &&
                      product.shops[0].links.cart && (
                        <View
                          style={{
                            marginHorizontal: 20,
                            marginTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          {/* Quantity input */}
                          <View style={styles.quantityInputContainer}>
                            <TouchableOpacity
                              style={[
                                styles.quantityInputButton,
                                parseInt(quantity, 10) === 1 ||
                                  parseInt(quantity, 10) - 1 <
                                  product.min_quantity
                                  ? styles.quantityInputButtonDisabled
                                  : {},
                              ]}
                              onPress={decreaseQuantity}
                              disabled={
                                parseInt(quantity, 10) === 1 ||
                                parseInt(quantity, 10) - 1 <
                                product.min_quantity
                              }>
                              <LorylistIcon
                                name={'minus'}
                                color={Colors.primary}
                                size={3}
                              />
                            </TouchableOpacity>

                            <TextInput
                              value={quantity}
                              onChangeText={setQuantity}
                              keyboardType="numeric"
                              maxLength={3}
                              style={styles.quantityInputField}
                            />

                            <TouchableOpacity
                              style={styles.quantityInputButton}
                              onPress={increaseQuantity}>
                              <LorylistIcon
                                name={'plus'}
                                color={Colors.primary}
                              />
                            </TouchableOpacity>
                          </View>

                          <ActionButton
                            color={'outlinePrimary'}
                            onPress={async () => {
                              if (product.shops.length > 1) {
                                dispatch(
                                  listOperations.doMapProductShop(product),
                                );
                              } else if (
                                product.shops.length === 1 &&
                                product.shops[0].links &&
                                product.shops[0].links.cart
                              ) {

                                Linking.openURL(
                                  product.shops[0].links.cart +
                                  '?quantity=' +
                                  String(quantity),
                                ).catch(err =>
                                  console.error("Couldn't load page", err),
                                );

                              }

                            }}
                            title="Sofort kaufen"
                          />
                        </View>
                      )}
                  </View>
                )}
              </View>

              {String(product.description_preview).trim().length > 0 && (

                <View style={{ flex: 1 }}
                  onTouchStart={(e) => onViewTouchStart(e)}
                  onTouchMove={(e) => onViewTouchMove(e)}
                  onTouchCancel={(e) => onViewTouchCancel(e)}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProductDescription', {
                        product: product,
                      })
                    }
                    style={{ marginTop: 30, paddingHorizontal: 20 }}>
                    <Text
                      style={styles.description_preview}
                      numberOfLines={4}
                      ellipsizeMode={'tail'}>
                      {product.description_preview}
                    </Text>

                    <Text
                      style={{
                        color: Colors.primary,
                        fontWeight: '600',
                        marginTop: 5,
                        marginBottom: 10,
                      }}>
                      Weiterlesen
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Toggle details */}
              {product &&
                ((product.nutritional_values &&
                  product.nutritional_values.length > 0) ||
                  (product.ingredients && product.ingredients.length > 0) ||
                  (product.shops && product.shops.length > 0)) && (
                  <View style={{ flex: 1 }}
                    onTouchStart={(e) => onViewTouchStart(e)}
                    onTouchMove={(e) => onViewTouchMove(e)}
                    onTouchCancel={(e) => onViewTouchCancel(e)}>
                    <FilterItem
                      icon="info-circle"
                      title={detailTitle}
                      subtitle=""
                      withChevron={true}
                      chevronDirection={showProductDetails ? 'down' : 'right'}
                      onPress={onToggleDetails}
                    />
                  </View>
                )}
            </View>
          )}

          {!isLoadingProduct ? (
            <>
              {showProductDetails && (

                <View style={s.productDetailsContainer}
                  onTouchStart={(e) => onViewTouchStart(e)}
                  onTouchMove={(e) => onViewTouchMove(e)}
                  onTouchCancel={(e) => onViewTouchCancel(e)}>
                  {/* Nutritional values */}
                  {product.nutritional_values &&
                    product.nutritional_values.length > 0 && (
                      <>
                        <NutritionalValues
                          name="Nährwertangaben"
                          style={styles.nutritionalValues}
                          items={product.nutritional_values}
                          unit={product.nutritional_values_unit}
                        />
                        <ListDivider
                          style={[
                            styles.divider,
                            { marginLeft: 0, marginRight: 0 },
                          ]}
                          simple={true}
                        />
                      </>
                    )}

                  {/* Ingredients */}
                  {product.ingredients && product.ingredients.length > 0 && (
                    <View style={s.ingredientsContainer}>
                      <Ingredients items={product.ingredients} />

                      <ListDivider
                        style={[
                          styles.divider,
                          { marginLeft: 0, marginRight: 0 },
                        ]}
                        simple={true}
                      />
                    </View>
                  )}

                  {/* Shops */}
                  {product.shops && product.shops.length > 0 && (
                    <ShopCollection
                      name="Erhältlich bei"
                      shops={product.shops}
                      style={{ marginTop: 20 }}
                    />
                  )}
                </View>

              )}

              {/* Brand related products */}

              {product.brand &&
                product.brand.products &&
                product.brand.products.length > 0 && (

                  <ProductCollection
                    style={{ marginTop: 20, paddingHorizontal: 0 }}
                    name={'Produkte von ' + product.brand.name}
                    brand={product.brand}
                    products={product.brand.products}
                  />

                )}
            </>
          ) : (
            <ActivityIndicator animating={true} style={{ marginTop: 20 }} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.white,
  },
  contentContainer: {

    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  content: {
    paddingBottom: 20,
    backgroundColor: Colors.white,
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
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 14,
    paddingTop: 1,
    paddingLeft: 1,
  },

  // Floating buttons
  floatingButtons: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 14,
    position: 'absolute',
    top: 46,
    left: 20,
    zIndex: 1,
  },

  // Share button
  shareButton: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 40,
  },

  // Bookmark button
  bookmarkButton: {
    width: 50,
    height: 40,
    marginTop: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Name row
  nameRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '100%',
  },

  // Name
  name: {
    flexWrap: 'wrap',
    fontFamily: 'CircularStd-Black',
    color: Colors.black,
    fontSize: 30,
    // lineHeight: 36,
    margin: 20,
    // marginRight: 90,
    marginBottom: 5,
  },

  // Price
  priceWrapper: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    marginRight: 20,
    flex: 1,
  },
  price: {
    alignSelf: 'flex-end',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'CircularStd-Bold',
    color: Colors.black,
  },
  priceUnit: {
    color: Colors.gray,
    fontFamily: 'CircularStd-Book',
    fontSize: 13,
  },
  basePrice: {
    alignSelf: 'flex-end',
    color: Colors.gray,
    fontFamily: 'CircularStd-Book',
    fontSize: 13,
  },

  // Meta data (brand + gtin)
  brandNamePrefix: {
    fontFamily: 'CircularStd-Book',
    color: Colors.gray,
    fontSize: 12,
  },
  brandName: {
    fontFamily: 'CircularStd-Medium',
    color: Colors.black,
    fontSize: 12,
    marginLeft: 10,
  },
  gtinContainer: {
    flexDirection: 'row',
  },

  // Vegan score
  veganScoreContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  veganScoreCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    zIndex: 1,

    shadowColor: 'rgba(0, 0, 0, 0.10)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  veganScore: {
    marginTop: -2,
    marginLeft: -2,
  },
  veganScoreInner: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'CircularStd-Bold',
    color: Colors.white,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    top: 6,
    width: 28,
  },
  veganScoreText: {
    borderRadius: 8,
    overflow: 'hidden',
    height: 28,
    marginLeft: -14,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'CircularStd-Bold',
    paddingTop: 6,
    paddingLeft: 22,
    paddingRight: 10,
  },

  // Offer details
  offerDetails: {
    marginTop: 40,
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
  },

  // Divider
  divider: {
    marginLeft: 20,
    marginRight: 20,
  },

  // Collection
  collection: {
    marginLeft: 20,
  },

  // Description
  description: {
    marginLeft: 20,
    marginRight: 20,
    color: Colors.gray,
    fontSize: 14,
    fontFamily: 'CircularStd-Book',
  },

  // Product details
  productDetailsContainer: {
    marginTop: 20,
  },
  ingredientsContainer: {
    paddingHorizontal: 20,
  },

  // No image
  noImage: {
    height: 200,
    backgroundColor: Colors.lightBackground,
    justifyContent: 'center',
  },
  noImageText: {
    fontFamily: 'CircularStd-Medium',
    color: Colors.black,
    textAlign: 'center',
    paddingTop: 50,
  },

  shoppingCartButton: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    top: -22,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  shoppingCartButtonIcon: {
    color: Colors.white,
    fontSize: 20,
  },
  cartCount: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    right: 58,
    top: -30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  cartCountNumber: {
    fontFamily: 'CircularStd-Medium',
    color: Colors.black,
    fontSize: 16,
  },

  // Quantity input
  quantityInputContainer: {
    marginRight: 20,
    flexDirection: 'row',
  },
  quantityInputButton: {
    backgroundColor: Colors.white,
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityInputButtonDisabled: {
    opacity: 0.4,
  },
  quantityInputField: {
    width: 40,
    color: Colors.black,
    textAlign: 'center',
  },

  // Min quantity info
  minQuantityInfo: {
    borderRadius: 12,
    backgroundColor: Colors.rgba(Colors.primary, 0.1),
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: -10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  minQuantityTitle: {
    color: Colors.primary,
    marginLeft: 5,
    fontFamily: 'CircularStd-Medium',
    fontSize: 14,
  },

  // Sold out info
  soldOutInfo: {
    borderRadius: 12,
    backgroundColor: Colors.rgba(Colors.danger, 0.1),
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: -10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  soldOutTitle: {
    color: Colors.danger,
    marginLeft: 5,
    fontFamily: 'CircularStd-Medium',
    fontSize: 14,
  },

  // Variants
  variantsContainer: {
    paddingHorizontal: 20,
  },
  variantOptionGroupContainer: {
    marginTop: 20,
    flexDirection: 'column',
  },
  variantOptionGroupName: {
    fontFamily: 'CircularStd-Medium',
    color: Colors.black,
    fontSize: 15,
    marginBottom: 10,
  },

  // Color options
  variantColorOptionsContainer: {
    flexDirection: 'row',
  },
  variantColorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightBackground,
    marginRight: 14,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
  },
  variantColorOptionSelected: {
    opacity: 1,
  },
  variantColorOptionSoldOut: {
    opacity: 0.2,
  },

  // Button options
  variantButtonOptionsContainer: {
    flexDirection: 'row',
  },
  variantButtonOptionsScrollView: {
    flexGrow: 1,
  },
  variantButtonOption: {
    height: 36,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginRight: 10,
  },
  variantButtonOptionSoldOut: {
    // backgroundColor: Colors.rgba(Colors.danger, 0.05),
    // borderColor: Colors.danger,
    opacity: 0.5,
  },
  variantButtonOptionSelected: {
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: Colors.rgba(Colors.primary, 0.15),
    opacity: 1.0,
  },
  variantButtonOptionName: {
    fontFamily: 'CircularStd-Medium',
    color: Colors.black,
  },
  variantButtonOptionNameSoldOut: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  variantButtonOptionNameSelected: {
    color: Colors.primary,
  },

  // Select options
  variantSelectOption: {
    height: 54,
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginRight: 10,
  },
  variantSelectOptionName: {
    fontFamily: 'CircularStd-Medium',
    color: Colors.black,
  },
  variantSelectOptionSoldOut: {
    color: Colors.danger,
    fontFamily: 'CircularStd-Medium',
    fontSize: 14,
  },
});
