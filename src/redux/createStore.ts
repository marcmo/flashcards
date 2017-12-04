import * as Redux from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import Reactotron from 'reactotron-react-native';
import { RootState } from '../Types';
import { persistStore } from 'redux-persist';
import { log } from '../lib/Logging';
import reduxPersist from './reduxPersist';
import RehydrationServices from '../services/RehydrationServices';

const createOurStore = (rootReducer): Promise<Redux.Store<RootState>> => {

  const enhancers: Array<Redux.GenericStoreEnhancer> = [];

  return new Promise((resolve, reject) => {
    try {

      // enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
      const useReactotron = true;
      const createAppropriateStore = useReactotron ? (Reactotron as any).createStore : createStore;
      const store: Redux.Store<RootState> = createAppropriateStore(rootReducer, compose(...enhancers));

      // configure persistStore and check reducer version number
      if (reduxPersist.active) {
        RehydrationServices.updateReducers(store);
      }

      persistStore( store, null, () => {
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
