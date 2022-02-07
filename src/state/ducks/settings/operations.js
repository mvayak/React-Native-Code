import actions from './actions';

const doToggleNotificationType = (type) => (dispatch, getState) => {
  const {
    settings: { notifications },
  } = getState();

  const state = notifications ? notifications[type] : false
  
  dispatch(actions.doUpdateNotificationType(type, ! state));
}

export default {
  doToggleNotificationType,
};
