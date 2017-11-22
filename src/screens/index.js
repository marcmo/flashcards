import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import Types from './NavigationTypes';

import Drawer from './types/Drawer';
import Modal from './types/Modal';

export function registerScreens() {
  Navigation.registerComponent('example.Types', () => Types);

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
