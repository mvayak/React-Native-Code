/**
 * LorylistIcon icon set component.
 * Usage: <LorylistIcon name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
const glyphMap = {
  "add-circle": 59905,
  "add-person": 59906,
  "add-to-basket": 59907,
  "bookmark": 59908,
  "camera": 59909,
  "check-circle": 59910,
  "chevron-down": 59911,
  "chevron-left": 59912,
  "chevron-right": 59913,
  "chevron-up": 59914,
  "cloud-download": 59915,
  "code": 59916,
  "cook-hat": 59917,
  "dashboard": 59918,
  "discover": 59919,
  "edit-text": 59920,
  "empty-shopping-list": 59921,
  "facebook": 59922,
  "facebook-icon": 59923,
  "filter": 59924,
  "hand": 59925,
  "heart": 59926,
  "heart-filled": 59927,
  "history": 59928,
  "history-clock": 59929,
  "home": 59930,
  "id-card": 59931,
  "info-circle": 59932,
  "instagram": 59933,
  "intro": 59934,
  "leaf": 59935,
  "link": 59936,
  "list": 59937,
  "long-arrow-down": 59938,
  "long-arrow-right": 59939,
  "long-check": 59940,
  "menu-bars": 59941,
  "message": 59942,
  "minus": 59943,
  "money-pig": 59944,
  "more": 59945,
  "more-horizontal": 59946,
  "notifications": 59947,
  "nv-cholesterol": 59948,
  "nv-dietary-fiber": 59949,
  "nv-energy": 59950,
  "nv-fat": 59951,
  "nv-kcal": 59952,
  "nv-monounsaturated-fat": 59953,
  "nv-polyunsaturated-fat": 59954,
  "nv-potassium": 59955,
  "nv-protein": 59956,
  "nv-saturated-fat": 59957,
  "nv-sodium": 59958,
  "nv-sugar": 59959,
  "nv-total-carbohydrate": 59960,
  "nv-trans-fat": 59961,
  "package": 59962,
  "parking-spot": 59963,
  "phone": 59964,
  "play": 59965,
  "plus": 59966,
  "remove-person": 59967,
  "rocket": 59968,
  "round-chart": 59969,
  "rows": 59970,
  "sale-sign": 59971,
  "search": 59972,
  "search-tree": 59973,
  "settings": 59974,
  "settings-gear": 59975,
  "share": 59976,
  "shield": 59977,
  "shop": 59978,
  "shopping-cart": 59979,
  "sign": 59980,
  "small-check": 59981,
  "sorting": 59982,
  "star": 59983,
  "tag": 59984,
  "thumb-up": 59985,
  "tiles": 59986,
  "times": 59987,
  "tiny-shop": 59988,
  "trash": 59989,
  "user": 59990,
  "users": 59991,
  "vibrate": 59992,
  "warning-triangle": 59993,
  "whatsapp": 59994,
  "www": 59995
};

const iconSet = createIconSet(glyphMap, 'lorylist-icon-font', 'lorylist-icon-font.ttf');

export default iconSet;
export const {
  Button,
  TabBarItem,
  TabBarItemIOS,
  getImageSource,
  getImageSourceSync,
} = iconSet;

