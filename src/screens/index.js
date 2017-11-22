import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import Types from './NavigationTypes';
import CodePush from 'react-native-code-push';

import Drawer from './types/Drawer';
import Modal from './types/Modal';

export const CodePushConfig = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
};

export function registerScreens() {
  Navigation.registerComponent('example.Types', () => CodePush(Types));

  Navigation.registerComponent('example.Types.Drawer', () => Drawer);
  Navigation.registerComponent('example.Types.Modal', () => Modal);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}
