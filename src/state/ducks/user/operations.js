import actions from './actions';

import * as service from '../../utils/services';
import _ from 'lodash';

// Amplify
import {listOperations, listActions} from '../lists';

const doResetSignIn = () => dispatch => {
  dispatch(actions.doSetIsLoadingSignIn(false));
};

const doResetForgotPassword = () => dispatch => {
  dispatch(actions.doStartForgotPassword());
  dispatch(actions.doSetIsLoadingForgotPassword(false));
};

const doResetSignUp = () => dispatch => {
  dispatch(actions.doStartSignUp());
  dispatch(actions.doSetIsLoadingSignUp(false));
};

const doOpenSignIn = open => dispatch => {
  dispatch(actions.doSetIsSignInOpen(open));
};

const doOpenSignUp = open => dispatch => {
  dispatch(actions.doSetIsSignUpOpen(open));
};

const doOpenUserMenu = open => dispatch => {
  dispatch(actions.doSetIsUserMenuOpen(open));
};

const doLogout = () => async (dispatch, getState) => {
  const {user} = getState().user;
  const {shoppingLists} = getState().lists;

  // Unsubscribe
  // sync.unsubscribe(user, shoppingLists);

  dispatch(actions.doUpdateUser({}));
  dispatch(listOperations.doClearUserShoppingLists());
};

// Sign in
const doSignIn = (email, password) => async (dispatch, getState) => {
  const {isLoadingSignIn} = getState().user;
  const {shoppingLists} = getState().lists;

  if (isLoadingSignIn) {
    return;
  }

  dispatch(actions.doStartSignIn());

  // try {
  // const user = await Auth.signIn(email, password)

  // if (user) {
  // Sign in
  const token = await service.signIn(email, password);

  if (token) {
    dispatch(actions.doUpdateToken(token));

    // Load user
    const user = await service.loadUser(token);
    dispatch(actions.doUpdateUser(user));

    // Sync shopping lists
    setTimeout(() => dispatch(listOperations.doSync()), 1000);

    // // Load shopping lists
    // const shoppingLists = await service.loadShoppingLists(token)
    // console.log(shoppingLists)
    // shoppingLists.forEach((list) => {
    //   dispatch(listActions.doCreateShoppingListFromShared(list))
    // })

    // Eager load friends
    dispatch(doLoadFriends());

    dispatch(actions.doSuccessSignIn());
  } else {
    dispatch(
      actions.doFailedSignIn(
        'Der Benutzer konnte im System nicht erkannt werden. Bitte wende dich an unseren Support: info@lorylist.com',
      ),
    );
  }
  // }
  // } catch (err) {
  //   if (err.code === 'UserNotConfirmedException') {
  //     dispatch(actions.doFailedSignIn('Du hast dein Benutzerkonto während der Registrierung nicht bestätigt. Bitte wende dich an unseren Support: info@lorylist.com'));
  //   } else if (err.code === 'PasswordResetRequiredException') {
  //     dispatch(actions.doFailedSignIn('Du musst dein Passwort zurücksetzen. Bitte klicke hierzu auf "Passwort vergessen"'));
  //   } else if (err.code === 'NotAuthorizedException') {
  //     dispatch(actions.doFailedSignIn('Das eingegebene Passwort ist falsch.'));
  //   } else if (err.code === 'UserNotFoundException') {
  //     dispatch(actions.doFailedSignIn('Es existiert kein Benutzer mit dieser E-Mail-Adresse. Bitte registriere dich.'));
  //   } else {
  //     dispatch(actions.doFailedSignIn('Es ist ein unbekannter Fehler aufgetreten.'));
  //   }
  // }
};

// Forgot password
const doForgotPassword = email => async (dispatch, getState) => {
  const {doSetIsLoadingForgotPassword} = getState().user;

  if (doSetIsLoadingForgotPassword) {
    return;
  }

  dispatch(actions.doStartForgotPassword());

  // await Auth.forgotPassword(email)
  //   .then(data => {
  //     dispatch(actions.doConfirmForgotPassword());
  //     // dispatch(actions.doSuccessForgotPassword());
  //   })
  //   .catch(err => {
  //     dispatch(actions.doFailedForgotPassword('Dein Password konnte nicht zurückgesetzt werden.'));
  //   });
};

// Confirm forgot password
const doConfirmForgotPassword = (email, code, password) => async (
  dispatch,
  getState,
) => {
  const {doSetIsLoadingForgotPassword} = getState().user;

  if (doSetIsLoadingForgotPassword) {
    return;
  }

  dispatch(actions.doStartForgotPassword());

  // await Auth.forgotPasswordSubmit(email, code, password)
  //   .then(data => {
  //     dispatch(actions.doSuccessForgotPassword());
  //   })
  //   .catch(err => {
  //     dispatch(actions.doFailedForgotPassword('Dein Password konnte nicht geändert werden.'));
  //   });
};

// Sign up
const doSignUp = (username, email, password) => async (dispatch, getState) => {
  const {isLoadingSignUp} = getState().user;

  if (isLoadingSignUp) {
    return;
  }

  dispatch(actions.doStartSignUp());

  // Sign up
  const newUser = await service.signUp(username, email, password);

  if (newUser.data && newUser.data.id) {
    // dispatch(actions.doConfirmSignUp());
    dispatch(doSignIn(email, password));
    dispatch(actions.doSuccessSignUp());
  } else {
    dispatch(
      actions.doFailedSignUp(
        newUser.map((error, index) => {
          return (index > 0 ? '\n' : '') + error;
        }),
      ),
    );
  }
};

// Confirm sign up
const doConfirmSignUp = (username, email, password, code) => async (
  dispatch,
  getState,
) => {
  const {isLoadingSignUp} = getState().user;

  if (isLoadingSignUp) {
    return;
  }

  dispatch(actions.doStartConfirmSignUp());

  // Aws confirm sign up
  // await Auth.confirmSignUp(email, code, {
  //   forceAliasCreation: true
  // }).then(res => {
  //   dispatch(doSignIn(email, password));
  //   dispatch(actions.doSuccessSignUp());
  // }).catch(err => {
  //   dispatch(actions.doFailedSignUp('Bestätigungscode ist ungültig.'));
  // })
};

const doLoadFriends = () => async (dispatch, getState) => {
  dispatch(actions.doSetShouldRefreshFriends(false));

  const {token, isLoadingFriends, user} = getState().user;

  if (isLoadingFriends) {
    return;
  }

  dispatch(actions.doSetIsLoadingFriends(true));

  // Load friends
  const data = await service.loadFriends(token, user);

  if (data) {
    dispatch(actions.doUpdateFriends(data.friends));
    dispatch(actions.doUpdateOutgoingFriendRequests(data.outgoingRequests));
    dispatch(actions.doUpdateIncomingFriendRequests(data.incomingRequests));
  }

  dispatch(actions.doSetIsLoadingFriends(false));
};

const doHandleFriendRequest = (type, friend) => async (dispatch, getState) => {
  const {token, user} = getState().user;

  // Handle friend request
  const response = await service.handleFriendRequest(token, type, user, friend);

  if (response) {
    dispatch(actions.doSetIsLoadingFriends(false));
    dispatch(actions.doSetShouldRefreshFriends(true));

    dispatch(doLoadFriends());
  }
};

const doRefreshFriends = () => async (dispatch, getState) => {
  dispatch(actions.doSetIsLoadingFriends(false));
  dispatch(actions.doSetShouldRefreshFriends(true));
};

const doUpdateUserProfile = (name, image) => async (dispatch, getState) => {
  const {token, user} = getState().user;

  // if (isLoadingSaveUser) return;

  dispatch(actions.doSetIsLoadingSaveUser(true));

  // Update user profile
  const data = await service.updateUser(token, user.id, name, image);

  // Sync shopping lists
  setTimeout(() => dispatch(listOperations.doSync()), 1000);

  if (data) {
    // Load user
    const _user = await service.loadUser(token);
    dispatch(actions.doUpdateUser(_user));
  }

  dispatch(actions.doSetIsLoadingSaveUser(false));
};

export default {
  doSignIn,
  doSignUp,
  doConfirmSignUp,
  doForgotPassword,
  doConfirmForgotPassword,
  doResetSignIn,
  doResetForgotPassword,
  doOpenSignIn,
  doOpenUserMenu,
  doLogout,
  doOpenSignUp,
  doResetSignUp,
  doLoadFriends,
  doRefreshFriends,
  doHandleFriendRequest,
  doUpdateUserProfile,
};
