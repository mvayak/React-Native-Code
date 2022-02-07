import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  FlatList,
  Text,
  RefreshControl,
  Image,
  Platform,
} from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ScrollPager } from 'react-native-tab-view';
import { colors } from '../../assets/styles';
import ProductCollection from '../collections/ProductCollection';
import ShopCollection from '../collections/ShopCollection';
import Icon from '../LorylistIcon';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HomeSectionList = React.forwardRef((props, ref) => {
  const {
    header,
    onScroll,
    isLoading,
    data,
    loadMore,
    refresh,
    refreshLabelOpacity,
    refreshChevronRotation,
  } = props;

  const renderItem = ({ item }) => {
    return <View style={{ flex: 1 }}>
      {['products_added', 'random_products'].indexOf(item.type) !==
        -1 && (
          <ProductCollection
            collection={item}
            shop={item.shop}
            brand={item.brand}
            products={item.products}
            name={item.name}
            headerLink={true}
            horizontal={false}
            grid={item.layout?.columns || 2}
            withBorder={item.name !== null}
          />
        )}
      {item.type === 'shop' && (
        <ShopCollection
          name={item.name}
          shops={item.shops}
          horizontal={false}
        />
      )}
    </View>
  };

  return (

    <View style={s.container}>

      {/* Custom refresh control */}
      {isLoading && (
        <View style={s.customRefreshControl}>
          <Image
            style={s.customRefreshControlImage}
            resizeMode={'contain'}
            source={require('../../assets/images/loading-animation.gif')}
          />
        </View>
      )}
      {!isLoading && (
        <Animated.View
          style={[
            s.refreshPlaceholder,
            {
              opacity: refreshLabelOpacity,
            },
          ]}>
          <Text style={s.refreshPlaceholderText}>Ziehen und loslassen</Text>

          <Animated.View
            style={{ transform: [{ translateY: refreshChevronRotation }] }}>
            <Icon name="chevron-down" size={14} color={colors.black} />
          </Animated.View>
        </Animated.View>
      )}

      <AnimatedFlatList
        ref={ref}
        keyboardShouldPersistTaps={'handled'}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        maxToRenderPerBatch={60}
        initialNumToRender={30}
        windowSize={1000}
        ListHeaderComponent={header}
        stickyHeaderIndices={[0]}
        onScroll={onScroll}
        removeClippedSubviews={true}
        style={s.sectionList}
        keyboardDismissMode={'on-drag'}
        refreshControl={
          <RefreshControl
            tintColor="transparent"
            colors={['transparent']}
            style={s.refreshControl}
            refreshing={isLoading}
            onRefresh={refresh}
          />
        }
        keyExtractor={(item, index) => 'home_collection_' + item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          data && isLoading ? (
            <View style={s.footerLoading}
            >
              <Image
                style={s.customRefreshControlImage}
                resizeMode={'contain'}
                source={require('../../assets/images/loading-animation.gif')}
              />
            </View>
          ) : null
        }
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
});

export default HomeSectionList;

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: (Platform.OS === 'ios') ? -44 : 0,
  },
  sectionList: {
    flex: 1,
  },

  // Refresh control
  refreshControl: {
    backgroundColor: 'transparent',
  },
  customRefreshControl: {
    position: 'absolute',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customRefreshControlImage: {
    height: 30,
  },
  refreshPlaceholder: {
    position: 'absolute',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshPlaceholderText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: 'CircularStd-Medium',
    marginBottom: 8,
  },
  footerLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    marginTop: 10,
    marginBottom: 44,
  },
});
