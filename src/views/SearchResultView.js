import React, { createRef, useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  FlatList,
  Dimensions,
  RefreshControl,
  Animated,
  Platform,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import EmptyMessage from '../components/content/EmptyMessage.js';
import { productOperations } from '../state/ducks/product';
import { listSelectors, listOperations } from './../state/ducks/lists';
import ProductCard from './../components/cards/ProductCard.js';

import SearchInput from '../components/form/SearchInput.js';

import Icon from '../components/LorylistIcon';

import colors from '../assets/styles/colors.js';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const CELL_WIDTH = (SCREEN_WIDTH - 40) / 3;
const statusBarHeight = Platform.select({ ios: 45, android: 0 });

const SearchResultView = ({ route, navigation }) => {
  const dispatch = useDispatch();

  // Refs
  const resultsList = createRef();

  // Route params
  const [query, setQuery] = useState(route.params?.query || null);
  const [collection, setCollection] = useState(
    route.params?.collection || null,
  );
  const [category, setCategory] = useState(route.params?.category || null);
  const [ingredient, setIngredient] = useState(
    route.params?.ingredient || null,
  );
  const [brand, setBrand] = useState(route.params?.brand || null);
  const [shop, setShop] = useState(route.params?.shop || null);
  const [isExternal, setExternal] = useState(
    route.params?.is_external || false,
  );

  // Redux data
  const {
    product: { isSearchLoading: isLoading, searchPage, searchData, searchTotal },
  } = useSelector(state => state);

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

  // const debouncedSearch = debounce(() => {
  //   search();
  // }, 500);

  // useEffect(() => {
  //   debouncedSearch();
  // }, [debouncedSearch, query]);

  // Methods
  const search = (searchParams = null) => {
    if (resultsList.current && searchPage === 1) {
      resultsList.current.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }

    // Identify query value
    const queryValue = searchParams !== null ? searchParams : query;

    // Track query
    if (
      query &&
      String(query).length > 0 &&
      !collection &&
      !shop &&
      !brand &&
      !category
    ) {
      dispatch(productOperations.doAddToLastSearched(query));
    }

    dispatch(
      productOperations.doSearchProducts({
        query: queryValue,
        category_id: category && category.id ? category.id : null,
        collection_id: collection && collection.id ? collection.id : null,
        brand_id: brand && brand.id ? brand.id : null,
        shop_id: shop && shop.id ? shop.id : null,
      }),
    );
  };

  useEffect(() => {
    search();

    // Add listener for go back to clear view
    // Clear if SearchResultView isn't available in routes stack
    navigation.addListener('state', data => {
      const indexOriginal = _.findIndex(data.data.state.routes, {
        name: 'SearchResultView',
      });
      const indexCollection = _.findIndex(data.data.state.routes, {
        name: 'CollectionSearch',
      });
      const indexSearch = _.findIndex(data.data.state.routes, {
        name: 'ShopSearch',
      });

      if (
        indexOriginal === -1 &&
        indexCollection === -1 &&
        indexSearch === -1
      ) {
        dispatch(productOperations.doResetSearch());
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => search(), [query, search]);

  const loadMore = () => {
    // Prevent when completely loaded
    if (searchData.length >= searchTotal) {
      return;
    }

    dispatch(
      productOperations.doSearchProducts(
        {
          query: query,
          category_id: category ? category.id : null,
          collection_id: collection ? collection.id : null,
          brand_id: brand ? brand.id : null,
          shop_id: shop ? shop.id : null,
        },
        true,
      ),
    );
  };

  // Refresh params
  useEffect(() => {

    setCollection(null);
    setShop(null);
    setBrand(null);
    setIngredient(null);

    setCategory(null);
    setExternal(false);
    setQuery(null);

    setQuery(route.params?.query || null);
    setCategory(route.params?.category || null);
    setCollection(route.params?.collection || null);
    setIngredient(route.params?.ingredient || null);
    setBrand(route.params?.brand || null);
    setShop(route.params?.shop || null);
    setExternal(route.params?.is_external || false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  // Headers
  const goBack = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const SearchHeader = () => {
    // Query input placeholder
    let queryInputPlaceholder = 'lorylist durchsuchen';
    if (collection) {
      queryInputPlaceholder = 'Sammlung durchsuchen';
    }
    if (shop) {
      queryInputPlaceholder = shop.name + ' durchsuchen';
    }

    return (
      <View style={s.headerContainer}>
        {/* Upper */}
        <View style={s.upperHeaderContainer}>
          {/* Back button */}
          <TouchableOpacity onPress={goBack} style={s.backButton}>
            <Icon name="chevron-left" size={14} color={colors.black} />
          </TouchableOpacity>

          {/* Title */}
          <Text style={s.headerTitle}>
            {collection ? collection.name : null}
            {shop ? shop.name : null}
            {query && !collection && !shop ? query : null}
          </Text>
        </View>

        {/* Query input */}
        {(collection || shop) && (
          <View style={s.searchInputContainer}>
            <SearchInput
              initialValue={query}
              placeholder={queryInputPlaceholder}
              onSubmit={value => {
                setQuery(value);
                dispatch(productOperations.doResetSearch());
                search(value);
              }}

            />
          </View>
        )}
      </View>
    );
  };


  return (
    <View style={s.container}>

      <SearchHeader />

      {/* No result */}
      {!isLoading && searchData && searchData.length === 0 && (
        <EmptyMessage
          icon="search"
          title="Keine Treffer"
          subtitle="Es wurden keine Produkte zu deiner Suche gefunden."
        />
      )}

      {/* Initial loading */}
      {isLoading && !searchData && (
        <View style={s.pageLoading}>
          <Image
            style={{ height: 30 }}
            resizeMode={'contain'}
            source={require('../assets/images/loading-animation.gif')}
          />
        </View>
      )}

      {/* Search result */}
      <FlatList
        ref={resultsList}
        style={s.resultsList}
        ListFooterComponent={
          searchData && isLoading ? (
            <View style={s.footerLoading}>
              <Image
                style={{ height: 30 }}
                resizeMode={'contain'}
                source={require('../assets/images/loading-animation.gif')}
              />
            </View>
          ) : null
        }
        data={searchData ? searchData : null}
        numColumns={3}
        keyboardDismissMode="on-drag"
        keyExtractor={(_, index) => index.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        renderItem={item => {
          return ProductCard(
            { width: CELL_WIDTH },
            item.item,
            0,
            isFavorite(item.item.id),
            () => {


              navigation.navigate('Product', {
                product: item.item,
              });

            },
            () => {

            },
            () => {


              navigation.navigate('Product', {
                product: item.item,
              });
            },
            null,
          );
        }}
      />

      {/* Custom refresh control */}
      {/* {(isLoading || (!isLoading && searchData === null)) && (
        <View
          style={{
            position: 'absolute',
            top: '50%',
            width: '100%',
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{height: 30}}
            resizeMode={'contain'}
            source={require('../assets/images/loading-animation.gif')}
          />
        </View>
      )} */}
    </View>
  );
};

export default SearchResultView;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loadingPlaceholder: {
    marginHorizontal: 20,
    marginTop: -50,
  },

  resultsList: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  refreshPlaceholderText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: 'CircularStd-Medium',
    marginBottom: 8,
  },

  // Header
  headerContainer: {
    paddingTop: statusBarHeight,
    backgroundColor: colors.white,
  },
  upperHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 50,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'CircularStd-Bold',
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    marginRight: 50,
    flexGrow: 1,
  },

  // Search input
  searchInputContainer: {
    marginHorizontal: 10,
  },

  footerLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    marginVertical: 20,
  },

  pageLoading: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 2,
    zIndex: 99,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
});
