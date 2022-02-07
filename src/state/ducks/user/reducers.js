import types from './types';

import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

const initialState = {
  // User info
  user: {},
  token: {},
  refreshSync: 0,

  // User menu
  isUserMenuOpen: false,

  // Sign in
  isLoadingSignIn: false,
  isSuccessSignIn: false,
  signInError: '',

  // Forgot password
  isLoadingForgotPassword: false,
  isConfirmForgotPassword: false,
  isSuccessForgotPassword: false,
  forgotPasswordError: '',

  // Sign up
  isLoadingSignUp: false,
  isConfirmSignUp: false,
  isSuccessSignUp: false,
  signUpError: '',

  // Friends
  friends: [],
  outgoingFriendRequests: [],
  incomingFriendRequests: [],
  isLoadingFriends: false,
  shouldRefreshFriends: false,

  isLoadingSaveUser: false,
};

function user(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USER: {
      return {
        ...state,
        user: action.payload.user,
        isUserMenuOpen: false,
        isSuccessSignIn: false,
        signInError: '',
      };
    }

    case types.UPDATE_TOKEN: {
      return {
        ...state,
        token: action.payload.token,
      };
    }

    // User menu
    case types.UPDATE_IS_USER_MENU_OPEN: {
      return {
        ...state,
        isUserMenuOpen: action.payload.state,
      };
    }

    // Open
    case types.UPDATE_IS_SIGN_IN_OPEN: {
      return {
        ...state,
        signInError: '',
      };
    }

    case types.UPDATE_IS_SIGN_UP_OPEN: {
      return {
        ...state,
        signUpError: '',
      };
    }

    // Loading
    case types.UPDATE_IS_LOADING_SIGN_IN: {
      return {
        ...state,
        isLoadingSignIn: action.payload.state,
      };
    }

    case types.UPDATE_IS_LOADING_FORGOT_PASSWORD: {
      return {
        ...state,
        isLoadingForgotPassword: action.payload.state,
      };
    }

    case types.UPDATE_IS_LOADING_SIGN_UP: {
      return {
        ...state,
        isLoadingSignUp: action.payload.state,
        isSuccessSignUp: false,
      };
    }

    // Update success
    case types.UPDATE_IS_SUCCESS_SIGN_IN: {
      return {
        ...state,
        isSuccessSignIn: action.payload.state,
      };
    }

    case types.UPDATE_IS_SUCCESS_FORGOT_PASSWORD: {
      return {
        ...state,
        isSuccessForgotPassword: action.payload.state,
      };
    }

    case types.UPDATE_IS_SUCCESS_SIGN_UP: {
      return {
        ...state,
        isSuccessSignUp: action.payload.state,
      };
    }

    // Start
    case types.START_SIGN_IN: {
      return {
        ...state,
        isLoadingSignIn: true,
        isSuccessSignIn: false,
        signInError: '',
      };
    }

    case types.START_FORGOT_PASSWORD: {
      return {
        ...state,
        isLoadingForgotPassword: true,
        isConfirmForgotPassword: false,
        isSuccessForgotPassword: false,
        forgotPasswordError: '',
      };
    }

    case types.START_CONFIRM_FORGOT_PASSWORD: {
      return {
        ...state,
        isLoadingForgotPassword: true,
        isConfirmForgotPassword: true,
        isSuccessForgotPassword: false,
        forgotPasswordError: '',
      };
    }

    case types.START_SIGN_UP: {
      return {
        ...state,
        isLoadingSignUp: true,
        isConfirmSignUp: false,
        isSuccessSignUp: false,
        signUpError: '',
      };
    }

    case types.START_CONFIRM_SIGN_UP: {
      return {
        ...state,
        isLoadingSignUp: true,
        isConfirmSignUp: true,
        isSuccessSignUp: false,
        signUpError: '',
      };
    }

    // Success
    case types.SUCCESS_SIGN_IN: {
      return {
        ...state,
        isLoadingSignIn: false,
        isSuccessSignIn: true,
        signInError: '',
      };
    }

    case types.SUCCESS_FORGOT_PASSWORD: {
      return {
        ...state,
        isLoadingForgotPassword: false,
        isConfirmForgotPassword: false,
        isSuccessForgotPassword: true,
        forgotPasswordError: '',
      };
    }

    case types.SUCCESS_SIGN_UP: {
      return {
        ...state,
        isLoadingSignUp: false,
        isConfirmSignUp: false,
        isSuccessSignUp: true,
        signUpError: '',
      };
    }

    // Confirm
    case types.CONFIRM_SIGN_UP: {
      return {
        ...state,
        isLoadingSignUp: false,
        isConfirmSignUp: true,
        isSuccessSignUp: false,
        signUpError: '',
      };
    }

    case types.CONFIRM_FORGOT_PASSWORD: {
      return {
        ...state,
        isLoadingForgotPassword: false,
        isConfirmForgotPassword: true,
        isSuccessForgotPassword: false,
        forgotPasswordError: '',
      };
    }

    // Failed
    case types.FAILED_SIGN_IN: {
      return {
        ...state,
        isLoadingSignIn: false,
        isSuccessSignIn: false,
        isUserMenuOpen: false,
        signInError: action.payload.message,
      };
    }

    case types.FAILED_FORGOT_PASSWORD: {
      return {
        ...state,
        isLoadingForgotPassword: false,
        isSuccessForgotPassword: false,
        forgotPasswordError: action.payload.message,
      };
    }

    case types.FAILED_SIGN_UP: {
      return {
        ...state,
        isLoadingSignUp: false,
        isConfirmSignUp: false,
        isSuccessSignUp: false,
        signUpError: action.payload.message,
      };
    }

    // Friends
    case types.UPDATE_FRIENDS: {
      return {
        ...state,
        friends: action.payload.friends,
      };
    }

    case types.UPDATE_OUTGOING_FRIEND_REQUESTS: {
      return {
        ...state,
        outgoingFriendRequests: action.payload.requests,
      };
    }

    case types.UPDATE_INCOMING_FRIEND_REQUESTS: {
      return {
        ...state,
        incomingFriendRequests: action.payload.requests,
      };
    }

    case types.UPDATE_IS_LOADING_FRIENDS: {
      return {
        ...state,
        isLoadingFriends: action.payload.state,
      };
    }

    case types.UPDATE_SHOULD_REFRESH_FRIENDS: {
      return {
        ...state,
        shouldRefreshFriends: action.payload.state,
      };
    }

    case types.REFRESH_SYNC: {
      return {
        ...state,
        refreshSync: state.refreshSync + 1,
      };
    }

    case types.UPDATE_IS_LOADING_SAVE_USER: {
      return {
        ...state,
        isLoadingSaveUser: action.payload.state,
      };
    }

    default:
      return state;
  }
}

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

const reducer = persistReducer(persistConfig, user);

export default reducer;
