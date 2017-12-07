import { Provider } from 'react-redux';
import { Platform, AppState } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens, registerScreenVisibilityListener } from './screens';
import createStore from './redux';
import { iconsLoaded } from './lib/appIcons';
import { log } from './lib/Logging';
import { Fonts, Colors, Metrics } from './themes/';
import './lib/reactotron';
const RNN = require('react-native-notifications');

const DELTA_T = 5000; // alarm time in ms
const upvoteAction = new RNN.NotificationAction({
  activationMode: 'background',
  title: String.fromCodePoint(0x1F44D),
  identifier: 'UPVOTE_ACTION',
}, (action, completed) => {
  RNN.default.log('ACTION RECEIVED');
  RNN.default.log(JSON.stringify(action));

  completed();
});

const replyAction = new RNN.NotificationAction({
  activationMode: 'background',
  title: 'Reply',
  behavior: 'textInput',
  authenticationRequired: true,
  identifier: 'REPLY_ACTION',
}, (action, completed) => {
  log.d('ACTION RECEIVED');
  log.d(action);

  completed();
});
const cat = new RNN.NotificationCategory({
  identifier: 'FLASH_REMINDER_CATEGORY',
  actions: [upvoteAction, replyAction],
  context: 'default',
});
const onPushRegistered = (deviceToken) => {
  log.d('Device Token Received: ' + deviceToken);
};

const onPushKitRegistered = (deviceToken) => {
  log.d('PushKit Token Received: ' + deviceToken);
};

const onNotificationReceivedForeground = (notification) => {
  log.d('Notification Received Foreground: ' + JSON.stringify(notification));
};

const onNotificationReceivedBackground = (notification) => {
  RNN.default.log('Notification Received Background: ' + JSON.stringify(notification));
};

const onNotificationOpened = (notification) => {
  log.d('Notification Opened: ' + JSON.stringify(notification));
};

RNN.default.addEventListener('remoteNotificationsRegistered', onPushRegistered);
RNN.default.requestPermissions([cat]);

RNN.default.consumeBackgroundQueue();

RNN.default.addEventListener('pushKitRegistered', onPushKitRegistered);
RNN.default.registerPushKit();

RNN.default.addEventListener('notificationReceivedForeground', onNotificationReceivedForeground);
RNN.default.addEventListener('notificationReceivedBackground', onNotificationReceivedBackground);
RNN.default.addEventListener('notificationOpened', onNotificationOpened);

// this will start the app
const handleAppStateChange = (nextAppState) => {
  // export type AppStateStatus = "active" | "background" | "inactive";
  log.d(`next app state: ${nextAppState}`);
  switch (nextAppState) {
    case 'active':
      break;
    case 'background':
      break;
    case 'inactive':
      const localNotification = RNN.default.localNotification({
        alertBody: `You didn't study for ${DELTA_T / 1000} seconds!`,
        alertTitle: 'Go Study Flashcards',
        alertAction: 'Click here to open',
        soundName: 'chime.aiff',
        category: 'FLASH_REMINDER_CATEGORY',
        fireDate: Date.now() + DELTA_T,
        userInfo: {},
      });
      break;
    default:
  }
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
