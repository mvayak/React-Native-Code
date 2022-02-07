import types from './types';

const doSetSnackbar = snackbar => {
  return {
    type: types.SET_SNACKBAR,
    payload: {snackbar},
  };
};

const doResetSnackbar = () => {
  return {
    type: types.RESET_SNACKBAR,
    payload: null,
  };
};

export default {
  doSetSnackbar,
  doResetSnackbar,
};
