import { combineReducers } from 'redux';
import { REHYDRATE, PURGE, persistCombineReducers } from 'redux-persist';
import * as Redux from 'redux';
import { RootState } from '../types';
import configureStore from './createStore';
import { deckReducer } from './decksReducer';
import { cardReducer } from './cardReducer';
import storage from 'redux-persist/lib/storage';
import { reducer as formReducer } from 'redux-form';
import reduxPersist from './reduxPersist';

const baseReducer: Redux.Reducer<RootState> = persistCombineReducers(
  reduxPersist.storeConfig,
  {
    decks: deckReducer,
    cardSet: cardReducer,
    form: formReducer,
  },
);

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }
  return baseReducer(state, action);
};
export default async (): Promise<Redux.Store<RootState>> => {
  return await configureStore(rootReducer);
};
