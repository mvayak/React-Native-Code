import actions from './actions';

const doSetSnackbar = snackbar => dispatch => {
  dispatch(actions.doSetSnackbar(snackbar));
};

const doResetSnackbar = () => dispatch => {
  dispatch(actions.doResetSnackbar());
};

export default {
  doSetSnackbar,
  doResetSnackbar,
};
