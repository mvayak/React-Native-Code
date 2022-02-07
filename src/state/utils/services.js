import axios from 'axios';
import * as Constants from '../utils/constants';
import helper from '../../helpers';
import AsyncStorage from '@react-native-community/async-storage';

const CancelToken = axios.CancelToken;

const host = Constants.API_HOST;

const API = {
  SEARCH: {
    CORE: `${host}/api/v1/search/core`,
    FILTERS: `${host}/api/v1/search/filters`,
  },
  PRODUCTS: function (id) {
    return `${host}/api/v1/products${id ? '/' + id : ''}`;
  },
  SHOPS: {
    LOAD: function (id) {
      return `${host}/api/v1/shops${id ? '/' + id : ''}`;
    },
  },
  HOME: `${host}/api/v1/home`,
  SIGN_IN: `${host}/oauth/token`,
  SIGN_UP: `${host}/api/v1/users/create`,
  LOAD_USER: `${host}/api/v1/users/my-user`,
  UPDATE_USER(user_id) {
    return `${host}/api/v1/users/${user_id}`;
  },
  SEND_FEEDBACK: `${host}/api/v1/feedback`,
  HEADER: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA0NTg1OTIwYjI5ODVmNWU4NzBlN2RmNDBhOGQxYzAwMTI2MDcxNWM0OWIxY2NkNDI0NTNjYjhjNWU0ZTMyNjkwMjI1ZmZkZjFmY2E2YTI0In0.eyJhdWQiOiI2IiwianRpIjoiMDQ1ODU5MjBiMjk4NWY1ZTg3MGU3ZGY0MGE4ZDFjMDAxMjYwNzE1YzQ5YjFjY2Q0MjQ1M2NiOGM1ZTRlMzI2OTAyMjVmZmRmMWZjYTZhMjQiLCJpYXQiOjE1ODA1NTg5NjIsIm5iZiI6MTU4MDU1ODk2MiwiZXhwIjoxNjEyMTgxMzYyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.nVGyQfubqdQX1fwV8-x11MtjeKWMZQpMwPGEbsFmz1fw0aIBuR0Un31ZYQYRf5rcRniehOIh_u_tQET45L__STkdq7bDBLKIx-GLlETonsg-ACsbOJHtqSFhWLaKgzPRku24Y3womuilbbxRGMW-4WccUSXMrAVoKw-c0EPV3VjK3igEeDYIo-gKByeUr5xjVWQ9IIweAaCI3kmQrYsxasqYoqRswl8Amu2yN588e4vzphDhfWUvLrWCkFQs3BvBAhxW0DgiURhALANwY2uj1YKYaQqzH4nlD70J2y3UPatj21Srt-Yxih1oJIHu4ooA4edp5z-Fbv-LT_hp_CQX3rSSwUlsF7iTHwZL8zb0WDuTofrA5rsbROI4xBe1ito2VoPgq9bvSHsu-JAE39eyXdRHm-QwZmQIoTgtruoZjLjhirqoHzQ1ZRZbv_BKANbKqV80ac_NCav4gq_QELU8_VPrnLz2bA5AKC9IJYgFe4opWdhM07txGmL3mu3BrUWI_qufDf7FhgnGR_Uvep-2nuPwPQ3I2U1TxkKwdEOsIriEP06zZGP-1RnTygWhaTgwsYFZqeM1OUxJoof73b3rrOJfFNrIRIyB-A4yFfHAHxEZPxqJ4zVgXpwUQBn2b3-CGCY0l5SJ_6t6IxWHmiH8dUBCruDQ574CIaoCClMP9UE',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

// Sign in
export async function signIn(email, password) {
  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('client_id', Constants.API_CLIENT.id);
  formData.append('client_secret', Constants.API_CLIENT.secret);
  formData.append('username', email.trim());
  formData.append('password', password.trim());

  try {
    // Axios Call
    const result = await axios({
      method: 'post',
      url: API.SIGN_IN,
      headers: API.HEADER,
      data: formData,
    });

    // console.log('Login result', result);

    if (result.status === 200 && result.data && result.data.access_token) {
      return result.data;
    }
  } catch (err) {
    // console.log('Sign in error', err.response);
    return null;
  }

  return null;
}

// Sign up
export async function signUp(username, email, password) {
  try {
    // Axios Call
    const result = await axios({
      method: 'post',
      url: API.SIGN_UP,
      headers: API.HEADER,
      data: {
        name: username.trim(),
        email: email.trim(),
        password: password.trim(),
      },
    });

    if (result.status === 201 && result.data && result.data) {
      return result.data;
    }
  } catch (err) {
    return Object.values(err.response.data.errors);
  }

  return null;
}

// Load user
export async function loadUser(token) {
  // Axios Call
  const result = await axios({
    method: 'get',
    url: API.LOAD_USER,
    headers: {
      Authorization: token.token_type + ' ' + token.access_token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (result.status === 200 && result.data && result.data.data) {
    return result.data.data;
  }

  return null;
}

var searchSource = null;
export async function search(params, searchNextLink) {
  // Cancel previous
  if (searchSource !== null) {
    searchSource.cancel('Automatically');
  }

  searchSource = CancelToken.source();

  let _params = {
    query: params.query,
    brand_id: params.brand_id,
    category_id: params.category_id,
    shop_id: params.shop_id,
    collection_id: params.collection_id,
    size: 21,
  };

  // Split next link to params
  if (searchNextLink) {
    const nextLinkParts = searchNextLink.split('?');
    searchNextLink = nextLinkParts[0];

    if (nextLinkParts.length === 2) {
      nextLinkParts[1].split('&').forEach(pair => {
        const pairParts = pair.split('=');

        if (pairParts.length === 2) {
          _params[pairParts[0]] = pairParts[1];
        }
      });
    }
  }

  // Clean params
  _params = Object.fromEntries(
    Object.entries(_params).filter(([_, v]) => v != null && v !== ''),
  );

  try {
    const result = await axios({
      method: 'get',
      url: searchNextLink ? searchNextLink : API.SEARCH.CORE,
      params: _params,
      headers: Constants.API_HEADERS,
      cancelToken: searchSource.token,
    });

    const {
      data: {
        data,
        meta: { total, current_page: page },
        context,
        links: { next: nextLink },
      },
    } = result;

    return { data, total, context, nextLink, page };
  } catch (err) {
    throw err;
  }
}

// Load home
export async function loadHome(nextLink) {
  try {
    const result = await axios({
      method: 'get',
      url: nextLink !== null ? nextLink : API.HOME,
      headers: Constants.API_HEADERS,
    });

    return {
      collections: result.data.data,
      categories: result.data.categories,
      nextLink: result.data.links.next,
      total: result.data.meta.total,
    };
  } catch (error) {
    // console.log('Home error', error.response);
    throw error;
  }
}

// Load search filters
export async function loadSearchFilters() {
  try {
    const result = await axios({
      method: 'get',
      url: API.SEARCH.FILTERS,
      headers: Constants.API_HEADERS,
    });

    return {
      filters: result.data,
    };
  } catch (error) {
    // throw error;
  }
}

// Load search filters
export async function sendFeedback(message, image) {
  try {
    var bodyFormData = new FormData();
    bodyFormData.append('body', message);

    if (image) {
      bodyFormData.append('image', {
        uri: image.uri,
        type: image.mime,
        name: 'screenshot.jpg',
      });
    }

    const result = await axios({
      method: 'post',
      url: API.SEND_FEEDBACK,
      headers: {
        ...Constants.API_HEADERS,
        'Content-Type': 'multipart/form-data',
      },
      data: bodyFormData,
    });

    return result.data.success;
  } catch (error) {
    return false;
  }
}

/**
 * Load product data with id
 *
 * Cached data is returned if the data exists and is not older than `10 minutes`,
 * otherwise, the data will be queried from the backend.
 *
 * Data retrieved from the backend are cached with `AsyncStorage`, with
 * `@PRODUCT-{id}` as storage key.
 *
 * When caching, this function checks the number of currently cached products,
 * and will remove the oldest cached product if `cachedProducts.length >= 10`,
 * by comparing `updatedAt` property of each cachedProduct.
 *
 * This will ensure there can be no more than 10 cached products at one time,
 * the limit can be updated by changing the `productCacheUpperLimit` variable within this function
 *
 * @param {String} id
 *
 * @returns A Product object
 */
export async function loadProduct(id, force = false) {
  // Storage key of this product
  const cachedKey = helper.storage_keys.PRODUCT(id);

  // Check for existing product, return if not null && not older than 10 minutes
  const product = await helper.get_data(cachedKey);

  const shouldUpdateCache = helper.isObjectNullOrOlderThan(product);

  if (product && !shouldUpdateCache && !force) {
    return product;
  }

  // Axios Call
  const result = await axios({
    method: 'get',
    url: API.PRODUCTS(id),
    headers: API.HEADER,
  });

  if (result.status === 200 && result.data && result.data.data) {
    const data = result.data.data;

    if (shouldUpdateCache) {
      // Update existing cache with new data
      await helper.store_data(cachedKey, data);
    } else {
      const productCacheUpperLimit = 10; // NOTE Change limit on number of of cache product

      // Cache data
      const keys = await AsyncStorage.getAllKeys();
      const cachedProductKeys = keys.filter(
        key => key.indexOf('@PRODUCT') >= 0,
      );

      if (cachedProductKeys.length < productCacheUpperLimit) {
        await helper.store_data(cachedKey, data);
      } else {
        const cachedProducts = await helper.get_many_data(cachedProductKeys);
        if (cachedProducts) {
          const oldestProduct = cachedProducts.sort(
            (a, b) => a.updatedAt > b.updatedAt,
          )[cachedProducts.length - 1];

          const olderProductKey = helper.storage_keys.PRODUCT(oldestProduct.id);

          await helper.delete_data(olderProductKey);

          await helper.store_data(cachedKey, data);
        }
      }
    }

    // Tracking
    const { id: product_id } = data;
    track.productView(product_id);

    return data;
  } else {
    // TODO Handle Error
    return null;
  }
}

/**
 * Load shop data with id
 *
 * Cached data is returned if the data exists and is not older than `10 minutes`,
 * otherwise, the data will be queried from the backend.
 *
 * Data retrieved from the backend are cached with `AsyncStorage`, with
 * `@SHOP-{id}` as storage key.
 *
 * When caching, this function checks the number of currently cached shops,
 * and will remove the oldest cached shop if `cachedShops.length >= 10`,
 * by comparing `updatedAt` property of each cachedShop.
 *
 * This will ensure there can be no more than 10 cached shops at one time,
 * the limit can be updated by changing the `shopCacheUpperLimit` variable within this function
 *
 * @param {String} id
 *
 * @returns A Shop object
 */
export async function loadShop(id) {
  // Storage key of this shop
  const cachedKey = helper.storage_keys.SHOP(id);

  // Check for existing shop, return if not null && not older than 10 minutes
  const shop = await helper.get_data(cachedKey);

  const shouldUpdateCache = helper.isObjectNullOrOlderThan(shop);

  if (shop && !shouldUpdateCache) {
    return shop;
  }

  // Axios Call
  const result = await axios({
    method: 'GET',
    url: API.SHOPS.LOAD(id),
    headers: API.HEADER,
  });

  if (result.status === 200 && result.data && result.data.data) {
    const data = result.data.data;

    if (shouldUpdateCache) {
      // Update existing cache with new data
      await helper.store_data(cachedKey, data);
    } else {
      const shopCacheUpperLimit = 10; // NOTE Change limit on number of of cache shop

      // Cache data
      const keys = await AsyncStorage.getAllKeys();
      const cachedShopKeys = keys.filter(key => key.indexOf('@SHOP') >= 0);

      if (cachedShopKeys.length < shopCacheUpperLimit) {
        await helper.store_data(cachedKey, data);
      } else {
        const cachedShops = await helper.get_many_data(cachedShopKeys);
        if (cachedShops) {
          const oldestShop = cachedShops.sort(
            (a, b) => a.updatedAt > b.updatedAt,
          )[cachedShops.length - 1];

          const olderShopKey = helper.storage_keys.SHOP(oldestShop.id);

          await helper.delete_data(olderShopKey);

          await helper.store_data(cachedKey, data);
        }
      }
    }

    return data;
  } else {
    // TODO Handle Error
    return null;
  }
}

const _doTrack = async (event, target_id) => {
  try {
    await axios({
      method: 'post',
      url: Constants.API_HOST + 'tracking',
      params: {
        event,
        target_id,
      },
      headers: Constants.API_HEADERS,
    });
  } catch (_) {
    throw _;
  }
};

export const track = {
  productView: async id => _doTrack('product.view', id),
  addToFavoriteList: async id => _doTrack('product.addToFavoritesList', id),
  removeFromFavoriteList: async id =>
    _doTrack('product.removeFromFavoritesList', id),
};

export default {
  track,
};

// // Stalling for 3 seconds
async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}
