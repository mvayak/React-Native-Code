import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductCollection from '../collections/ProductCollection';
import EmptyMessage from './EmptyMessage';
import ListDivider from './ListDivider';
import Icon from '../LorylistIcon';
import { colors } from '../../assets/styles';
import { productOperations } from '../../state/ducks/product';
import { listSelectors, listOperations } from '../../state/ducks/lists';
import _ from 'lodash';
import ProductCard from './../cards/ProductCard';
const screenWidth = Math.round(Dimensions.get('window').width);

const LastSeen = ({ containerStyle = null, navigation, isVisible }) => {
  const {
    product: { lastSeen, lastSearched },
  } = useSelector(state => state);

  const dispatch = useDispatch();

  // Local state
  const [maxQueries, setMaxQueries] = useState(5);

  // const currentList = useSelector(state =>
  //   listSelectors.currentShoppingList(state),
  // );

  useEffect(() => {
    // Add listener for state change to reset max visible queries
    navigation.addListener('state', data => {
      setTimeout(() => setMaxQueries(5), 500);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const searchItem = query => {
    navigation.navigate('SearchResultView', {
      query: query,
      resultBy: 'search',
    });
  };

  const renderProduct = product =>
    ProductCard(
      {
        width: (screenWidth - 40) / 2,
        height: (screenWidth - 40) / 2,
      },
      product,
      0,
      isFavorite(product.id),
      () => {
        navigation.navigate('Product', {
          product: product,
        });
        // dispatch(listOperations.doTryAddProductToShoppingList(product));
      },
      null,
      // () => {
      //   Vibration.vibrate();
      //   dispatch(listOperations.doMapProductShop(product));
      // },
      () => {
        navigation.navigate('Product', {
          product: product,
        });
      },
      null,
      true,
    );

  return (
    <View style={[s.container, containerStyle]}>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.contentContainer}
        keyboardDismissMode={'on-drag'}
        onScrollBeginDrag={Keyboard.dismiss}>
        {/* Start search */}
        {(!lastSearched || (lastSearched && lastSearched.length === 0)) && (
          <EmptyMessage
            containerStyle={s.emptyMessage}
            icon="search"
            title="Produktsuche"
            subtitle="Durchsuche die bunte Welt der veganen Lebensmittel."
          />
        )}
        {/* Last searched */}
        {lastSearched && lastSearched.length > 0 && (
          <View style={s.queriesContainer}>
            {lastSearched.slice(0, maxQueries).map(query => (
              <View
                key={'searchItem_' + query.key}
                style={s.queryContainer}>
                <TouchableOpacity
                  style={s.queryItem}
                  onPress={() => searchItem(query)}>
                  <Text style={s.queryItemText}>{query}</Text>
                </TouchableOpacity>

                {/* Remove button */}
                <TouchableOpacity
                  style={s.removeQueryButton}
                  onPress={() =>
                    dispatch(productOperations.doRemoveFromLastSearched(query))
                  }>
                  <Icon name="times" size={14} color={colors.black} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Show all queries */}
        {lastSearched && lastSearched.length > maxQueries && (
          <TouchableOpacity
            style={s.showAllQueriesButton}
            onPress={() => setMaxQueries(20)}>
            <Text style={s.showAllQueriesButtonText}>Alle anzeigen</Text>
          </TouchableOpacity>
        )}

        {lastSeen && lastSeen.length > 0 && (
          <ListDivider
            simple={true}
            style={
              !lastSearched || (lastSearched && lastSearched.length === 0)
                ? null
                : s.divider
            }
          />
        )}

        {lastSearched &&
          lastSearched.length > 0 &&
          (!lastSeen || (lastSeen && lastSeen.length === 0)) && (
            <EmptyMessage
              containerStyle={[s.emptyMessage, s.emptyLastSeenMessage]}
              icon="search"
              title="Produktsuche"
              subtitle="Durchsuche die bunte Welt der veganen Lebensmittel."
            />
          )}

        {lastSeen && lastSeen.length > 0 && (
          <Text style={s.lastSeenHeader}>Zuletzt angesehen</Text>
        )}

        {/* Last seen */}
        {lastSeen &&
          lastSeen.length > 0 &&
          _.chunk(lastSeen, 2).map(productRow => (
            <View
              style={s.productRow}>
              {productRow.map(product => renderProduct(product))}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default LastSeen;

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  collectionsWrapper: {
    marginTop: 10,
  },
  contentContainer: {
    paddingTop: 30,
  },
  emptyMessage: {
    flex: 0,
    marginTop: -70,
    marginBottom: -10,
  },
  emptyLastSeenMessage: {
    marginTop: 0,
  },

  divider: {
    marginTop: -1,
  },

  // Query
  queriesContainer: {
    marginTop: -25,
  },
  queryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    maxWidth: '100%',
    borderBottomColor: colors.border,
  },
  queryItem: {
    flexGrow: 1,
    paddingVertical: 14,
    paddingRight: 50,
    paddingLeft: 20,
  },
  queryItemText: {
    color: colors.black,
    fontFamily: 'CircularStd-Medium',
    fontSize: 16,
    flexWrap: 'wrap',
    flex: 1,
  },
  removeQueryButton: {
    marginLeft: 'auto',
    paddingVertical: 17,
    paddingHorizontal: 20,
  },

  // Show all queries button
  showAllQueriesButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  showAllQueriesButtonText: {
    fontFamily: 'CircularStd-Medium',
    color: colors.rgba(colors.black, 0.5),
    fontSize: 13,
  },

  productRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  lastSeenHeader: {
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 20,
    fontFamily: 'CircularStd-Bold',
  },
});
