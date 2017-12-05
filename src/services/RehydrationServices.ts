import * as Redux from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import { RootState } from '../types';
import { log } from '../lib/Logging';
import reduxPersist from '../redux/reduxPersist';

const updateReducers = (store: Redux.Store<RootState>) => {
  const reducerVersion = reduxPersist.reducerVersion;
  const config = reduxPersist.storeConfig;

  // Check to ensure latest reducer version
  AsyncStorage.getItem('@flashcardsStore:reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      // Purge store
      log.w('reducer version changed, purging store!');
      persistStore(store, null).purge();
      AsyncStorage.setItem('@flashcardsStore:reducerVersion', reducerVersion);
    } else {
      persistStore(store, null);
    }
  }).catch(() => {
    persistStore(store, null);
    AsyncStorage.setItem('@flashcardsStore:reducerVersion', reducerVersion);
  });
};

export default {updateReducers};
