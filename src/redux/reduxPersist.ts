import { AsyncStorage } from 'react-native';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '0.6',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ['decks', 'cardSet'],
    debug: true,
  },
};

export default REDUX_PERSIST;
