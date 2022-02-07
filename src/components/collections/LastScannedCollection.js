import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../../assets/styles/colors';

// import { Container } from './styles';

export default function LastScannedCollection(props) {
  const { onPress } = props;
  const {
    product: { lastScanned: products },
  } = useSelector(state => state);

  const renderProduct = ({ item: product }) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(product)}
        style={{
          width: 129,
          height: 50,
          borderRadius: 8,
          backgroundColor: 'white',
          marginRight: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <Image source={{ uri: product.images[0].image, width: 36, height: 36 }} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text
            style={{
              fontFamily: 'CircularStd-Book',
              fontSize: 8.5,
              color: colors.lightGray,
              letterSpacing: -0.2,
            }}>
            {product.brand.name}
          </Text>
          <Text
            style={{
              fontFamily: 'CircularStd-Medium',
              fontSize: 9.9,
              color: colors.black,
              lineHeight: 10.4,
            }}
            numberOfLines={2}
            ellipsizeMode="middle">
            {product.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        zIndex: 10000,
        top: 30,
        left: 0,
        right: 0,
      }}>
      <Text
        style={{
          paddingHorizontal: 10,
          color: 'white',
          marginBottom: 10,
        }}>
        Zuletzt gescannt
      </Text>
      {/* Last Scanned Products */}
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        data={products}
        horizontal
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderProduct}
      />
    </View>
  );
}
