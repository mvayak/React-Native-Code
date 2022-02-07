import AsyncStorage from '@react-native-community/async-storage';

export default {
  number_format: function (number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');

    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
      dec = typeof dec_point === 'undefined' ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);

        return '' + (Math.round(n * k) / k).toFixed(prec);
      };

    //Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }

    return s.join(dec);
  },

  format_price: function (number) {
    return Math.floor(number) == number
      ? this.number_format(number, 2, ',', '.')
      : this.number_format(number, 2, ',', '.');
  },

  /**
   * Convert array into object with key,
   * assuming all objects in the array have unique keys, object with duplicate keys will be overwritten
   *
   * @param {any[]} array Object Array
   * @param {string} key Key to be used
   *
   * @returns An object with keyed properties
   *
   * @example
   * const array = [{id: 123, name: "Potato"}, {id: 234, name: "Lory"}]
   *
   * const obj = convert_array_to_object(array, 'id')
   *
   * obj === {
   *    123: {id: 123, name: "Potato"},
   *    234: {id: 234, name: "Lory"}
   * } // true
   *
   */
  convert_array_to_object: function (array, key) {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  },
  storage_keys: {
    LOCATIONS: '@LOCATIONS',
    PRODUCT: function (id) {
      return `@PRODUCT-${id}`;
    },
    SHOP: function (id) {
      return `@SHOP-${id}`;
    },
  },
  store_data: async function (key, value) {
    try {
      value.updatedAt = Date.now();
      const merged = await AsyncStorage.mergeItem(key, JSON.stringify(value));
      if (!merged) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      }
      return true;
    } catch (e) {
      return false;
    }
  },
  delete_data: async function (key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  },
  get_data: async function (key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : false;
    } catch (e) {
      return false;
    }
  },
  get_many_data: async function (keys) {
    try {
      const values = await AsyncStorage.multiGet(keys);
      if (values && values.length > 0) {
        return values.map((k, v) => JSON.parse(v));
      }
      return false;
    } catch (e) {
      return false;
    }
  },
  isObjectNullOrOlderThan: function (object, minutes = 10, key = 'updatedAt') {
    return (
      object &&
      object[key] &&
      Math.abs(Date.now() - object[key]) / 1000 >= 60 * minutes
    );
  },

  uuidv4: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;

      return v.toString(16);
    });
  },

  prettyUrl: url => {
    return (
      'www.' +
      String(url)
        .replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
    );
  },
  save_data: async function (key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },
};
