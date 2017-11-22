import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens, registerScreenVisibilityListener} from './screens';

// screen related book keeping
registerScreens();
registerScreenVisibilityListener();


// this will start our app
Navigation.startSingleScreenApp({
  screen: {
    label: 'Navigation',
    screen: 'example.Types',
    title: 'Navigation Types'
  },
  appStyle: {
    navBarButtonColor: '#ffffff',
    navBarTextColor: '#ffffff',
    navigationBarColor: '#003a66',
    navBarBackgroundColor: '#003a66',
    statusBarColor: '#002b4c',
  },
  drawer: {
    left: {
      screen: 'example.Types.Drawer'
    }
  }
})
