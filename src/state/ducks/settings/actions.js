import types from './types';

const doUpdateNotificationType = (type, state) => ({
  type: types.UPDATE_NOTIFICATION_TYPE,
  payload: { type, state },
});

export default {
  doUpdateNotificationType,
};
