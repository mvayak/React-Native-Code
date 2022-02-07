import types from './types';

const doUpdateSkippedIntro = state => ({
  type: types.UPDATE_SKIPPED_INTRO,
  payload: {state},
});

const doUpdateDoneIntro = state => ({
  type: types.UPDATE_SKIPPED_INTRO,
  payload: {state},
});

export default {
  doUpdateSkippedIntro,
  doUpdateDoneIntro,
};
