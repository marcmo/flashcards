import * as Redux from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { RootState } from '../Types';
import { persistStore } from 'redux-persist';
import { log } from '../lib/Logging';
import reduxPersist from './reduxPersist';
import RehydrationServices from '../services/RehydrationServices';

const createOurStore = (rootReducer): Promise<Redux.Store<RootState>> => {

  const enhancers: Array<Redux.GenericStoreEnhancer> = [];

  return new Promise((resolve, reject) => {
    try {
      log.d('1 =================');

      if (reduxPersist.active) {
        log.d('3 =================');
      }
      log.d('4 =================');
      // enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
      const store: Redux.Store<RootState> = createStore(rootReducer, compose(...enhancers));
      log.d('4 =================');

      // configure persistStore and check reducer version number
      if (reduxPersist.active) {
        log.d('5 =================');
        RehydrationServices.updateReducers(store);
      }
      log.d('5 =================');

      persistStore( store, null, () => {
        log.d('6 =================');
        log.d('persistStore returned!', store.getState());
        store.getState();
        resolve(store);
      });
    } catch (e) {
      log.w('problem at startup', e);
      reject(e);
    }
  });
};
export default createOurStore;
