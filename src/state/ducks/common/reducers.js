import types from './types';

const initialState = {
  isSnackbarVisible: false,
  snackbar: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SNACKBAR: {
      return {
        ...state,
        isSnackbarVisible: true,
        snackbar: action.payload.snackbar,
      };
    }

    case types.RESET_SNACKBAR: {
      return {
        ...state,
        isSnackbarVisible: false,
        snackbar: null,
      };
    }

    default:
      return state;
  }
}

export default reducer;
