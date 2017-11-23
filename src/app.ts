import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens, registerScreenVisibilityListener } from './screens';

// screen related book keeping
registerScreens();
registerScreenVisibilityListener();

// this will start our app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'example.Types',
    title: 'Navigation Types',
    navigatorStyle: {
      navBarButtonColor: '#ffffff',
      navBarTextColor: '#ffffff',
      navBarBackgroundColor: '#003a66',
    },
  },
  drawer: {
    left: {
      screen: 'example.Types.Drawer',
    },
  },
});
