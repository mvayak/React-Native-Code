import types from './types';

const initialSettingsState = {
  notifications: {
    friendRequests: true,
    sharedListUpdates: true,
    smartAds: true,
  },
};

const reducer = (state = initialSettingsState, action) => {
  switch (action.type) {
    case types.UPDATE_NOTIFICATION_TYPE:
      const notifications = state.notifications
      notifications[action.payload.type] = action.payload.state

      return {
        ...state,
        notifications,
      };

    default:
      return state;
  }
};

export default reducer;
