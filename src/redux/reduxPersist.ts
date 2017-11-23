import { AsyncStorage } from 'react-native';

const REDUX_PERSIST = {
  active: false,
  reducerVersion: '0.1',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ['decks'],
    debug: true,
  },
};

export default REDUX_PERSIST;
