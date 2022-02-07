import _ from 'lodash';

const isProductInShop = (state, product, shop) => {
  const {shopProductMap} = state.product;

  const productId = product.id;
  const shopId = shop.id;

  if (productId && shopId && shopProductMap && shopProductMap[shopId]) {
    const index = _.findIndex(shopProductMap[shopId], id => {
      return id === productId;
    });
    return index > -1;
  }

  return false;
};

export default {
  isProductInShop,
};
