import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import * as reducers from './ducks';

/**
 * SECTION Reducers
 */
const rootReducer = combineReducers(reducers);

/**
 * SECTION Persist configs
 */
const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootPersistedReducer = persistReducer(rootPersistConfig, rootReducer);

/**
 * SECTION Store
 */
const store = createStore(
  rootPersistedReducer,
  // applyMiddleware(thunkMiddleware, createLogger(true)),
  applyMiddleware(thunkMiddleware),
);

export default store;
