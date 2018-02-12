import { Provider } from 'react-redux';
import { Platform, AppState, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Push from 'appcenter-push';

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
Push.setListener({
  onPushNotificationReceived: (pushNotification) => {
    let message = pushNotification.message;
    let title = pushNotification.title;

    if (message === null || message === undefined) {
      // Android messages received in the background don't include a message. On Android, that fact can be used to
      // check if the message was received in the background or foreground. For iOS the message is always present.
      title = 'Android background';
      message = '<empty>';
    }

    // Custom name/value pairs set in the App Center web portal are in customProperties
    if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
      message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
    }

    if (AppState.currentState === 'active') {
      Alert.alert(title, message);
    } else {
      // Sometimes the push callback is received shortly before the app is fully active in the foreground.
      // In this case you'll want to save off the notification info and wait until the app is fully shown
      // in the foreground before displaying any UI. You could use AppState.addEventListener to be notified
      // when the app is fully in the foreground.
    }
  },
});
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
