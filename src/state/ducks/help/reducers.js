import types from './types';

const initialHelpState = {
  isSkippedIntro: false,
  isDoneIntro: false,
};

const reducer = (state = initialHelpState, action) => {
  switch (action.type) {
    case types.UPDATE_SKIPPED_INTRO:
      return {
        ...state,
        isSkippedIntro: action.payload.state,
      };

    case types.UPDATE_DONE_INTRO:
      return {
        ...state,
        isDoneIntro: action.payload.state,
      };

    default:
      return state;
  }
};

export default reducer;
