import { Provider } from 'react-redux';
import { Platform, AppState } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens, registerScreenVisibilityListener } from './screens';
import createStore from './redux';
import { iconsLoaded } from './lib/appIcons';
import { log } from './lib/Logging';
import { Fonts, Colors, Metrics } from './themes/';
import './lib/reactotron';

// this will start the app
const handleAppStateChange = (nextAppState) => {
  log.d(`next app state: ${nextAppState}`);
};

const storePromise = createStore();
storePromise.then((store) => {
  // screen related book keeping
  registerScreens(store, Provider);
  registerScreenVisibilityListener();

  iconsLoaded.then(() => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'flashcards.DecksScreen',
        title: 'Decks',
        navigatorStyle: {
          navBarButtonColor: '#ffffff',
          navBarTextColor: '#ffffff',
          navBarBackgroundColor: Colors.darkGray,
          statusBarTextColorScheme: 'light',
        },
      },
      drawer: {
        left: {
          screen: 'flashcards.Types.Drawer',
        },
      },
    });
  });
  AppState.addEventListener('change', handleAppStateChange);
}, (reason) => {
  log.w('we got rejected during createStore', reason);
});
