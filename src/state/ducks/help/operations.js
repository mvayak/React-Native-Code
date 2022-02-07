import actions from './actions';

const doSkipIntro = () => dispatch => {
  dispatch(actions.doUpdateSkippedIntro(true));
};

const doDoneIntro = () => dispatch => {
  dispatch(actions.doUpdateDoneIntro(true));
};

const doResetIntro = () => dispatch => {
  dispatch(actions.doUpdateSkippedIntro(false));
  dispatch(actions.doUpdateDoneIntro(false));
};

export default {
  doSkipIntro,
  doDoneIntro,
  doResetIntro,
};
