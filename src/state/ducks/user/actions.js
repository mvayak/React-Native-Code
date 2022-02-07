import types from './types';

const doUpdateUser = (user) => {
  return {
    type: types.UPDATE_USER,
    payload: {
      user,
    },
  };
};

const doUpdateToken = (token) => {
  return {
    type: types.UPDATE_TOKEN,
    payload: { token },
  };
};

// User menu
const doSetIsUserMenuOpen = state => {
  return {
    type: types.UPDATE_IS_USER_MENU_OPEN,
    payload: { state },
  }
};

// Open
const doSetIsSignInOpen = state => {
  return {
    type: types.UPDATE_IS_SIGN_IN_OPEN,
    payload: { state },
  };
};

const doSetIsSignUpOpen = state => {
  return {
    type: types.UPDATE_IS_SIGN_UP_OPEN,
    payload: { state },
  };
};

// Loading
const doSetIsLoadingSignIn = state => {
  return {
    type: types.UPDATE_IS_LOADING_SIGN_IN,
    payload: { state },
  };
};

const doSetIsLoadingForgotPassword = state => {
  return {
    type: types.UPDATE_IS_LOADING_FORGOT_PASSWORD,
    payload: { state },
  };
};

const doSetIsLoadingSignUp = state => {
  return {
    type: types.UPDATE_IS_LOADING_SIGN_UP,
    payload: { state },
  };
};

// Success
const doSetIsSuccessSignIn = state => {
  return {
    type: types.UPDATE_IS_SUCCESS_SIGN_IN,
    payload: { state },
  };
};

const doSetIsSuccessForgotPassword = state => {
  return {
    type: types.UPDATE_IS_SUCCESS_FORGOT_PASSWORD,
    payload: { state },
  };
};

const doSetIsSuccessSignUp = state => {
  return {
    type: types.UPDATE_IS_SUCCESS_SIGN_UP,
    payload: { state },
  };
};

// Stat
const doStartSignIn = () => {
  return {
    type: types.START_SIGN_IN,
    payload: {},
  };
};
const doStartForgotPassword = () => {
  return {
    type: types.START_FORGOT_PASSWORD,
    payload: {},
  };
};
const doStartConfirmForgotPassword = () => {
  return {
    type: types.START_CONFIRM_FORGOT_PASSWORD,
    payload: {},
  };
};
const doStartSignUp = () => {
  return {
    type: types.START_SIGN_UP,
    payload: {},
  };
};
const doStartConfirmSignUp = () => {
  return {
    type: types.START_CONFIRM_SIGN_UP,
    payload: {},
  };
};

// Success
const doSuccessSignIn = () => {
  return {
    type: types.SUCCESS_SIGN_IN,
    payload: {},
  };
};
const doSuccessForgotPassword = () => {
  return {
    type: types.SUCCESS_FORGOT_PASSWORD,
    payload: {},
  };
};
const doSuccessSignUp = () => {
  return {
    type: types.SUCCESS_SIGN_UP,
    payload: {},
  };
};

const doConfirmSignUp = () => {
  return {
    type: types.CONFIRM_SIGN_UP,
    payload: {},
  };
};
const doConfirmForgotPassword = () => {
  return {
    type: types.CONFIRM_FORGOT_PASSWORD,
    payload: {},
  };
};

// Failed
const doFailedSignIn = (message) => {
  return {
    type: types.FAILED_SIGN_IN,
    payload: {message},
  };
};
const doFailedForgotPassword = (message) => {
  return {
    type: types.FAILED_FORGOT_PASSWORD,
    payload: { message },
  };
};
const doFailedSignUp = (message) => {
  return {
    type: types.FAILED_SIGN_UP,
    payload: {message},
  };
};

// Friends
const doUpdateFriends = (friends) => {
  return {
    type: types.UPDATE_FRIENDS,
    payload: { friends },
  };
};
const doUpdateOutgoingFriendRequests = (requests) => {
  return {
    type: types.UPDATE_OUTGOING_FRIEND_REQUESTS,
    payload: { requests },
  };
};
const doUpdateIncomingFriendRequests = (requests) => {
  return {
    type: types.UPDATE_INCOMING_FRIEND_REQUESTS,
    payload: { requests },
  };
};
const doSetIsLoadingFriends = state => {
  return {
    type: types.UPDATE_IS_LOADING_FRIENDS,
    payload: { state },
  };
};
const doSetShouldRefreshFriends = state => {
  return {
    type: types.UPDATE_SHOULD_REFRESH_FRIENDS,
    payload: { state },
  };
};
const doSetIsLoadingSaveUser = state => {
  return {
    type: types.UPDATE_IS_LOADING_SAVE_USER,
    payload: { state },
  }
}


// Refresh sync
const doRefreshSync = state => {
  return {
    type: types.REFRESH_SYNC,
    payload: {},
  }
}

export default {
  doUpdateUser,
  doUpdateToken,

  doSetIsUserMenuOpen,

  doSetIsSignInOpen,
  doSetIsSignUpOpen,
  doSetIsLoadingSignIn,
  doSetIsSuccessSignIn,
  doSetIsLoadingSignUp,
  doSetIsSuccessSignUp,
  doStartSignIn,
  doStartSignUp,
  doStartConfirmSignUp,
  doSuccessSignIn,
  doSuccessSignUp,
  doFailedSignIn,
  doFailedSignUp,

  doSetIsLoadingForgotPassword,
  doSetIsSuccessForgotPassword,
  doStartForgotPassword,
  doSuccessForgotPassword,
  doFailedForgotPassword,
  doStartConfirmForgotPassword,
  doConfirmForgotPassword,

  doUpdateFriends,
  doUpdateOutgoingFriendRequests,
  doUpdateIncomingFriendRequests,
  doSetIsLoadingFriends,
  doSetShouldRefreshFriends,

  doConfirmSignUp,

  doRefreshSync,
  doSetIsLoadingSaveUser,
};
