import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import Types from './NavigationTypes';
import CodePush from 'react-native-code-push';
import { log } from '../lib/Logging';

import Drawer from './types/Drawer';
import Modal from './types/Modal';

export const CodePushConfig = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
};

export function registerScreens() {
  Navigation.registerComponent('example.Types', () => CodePush(CodePushConfig)(Types));
  Navigation.registerComponent('example.Types.Drawer', () => Drawer);
  Navigation.registerComponent('example.Types.Modal', () => Modal);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({ screen }) =>
      log.d(`Displaying screen ${screen}`),
    didAppear: ({ screen, startTime, endTime, commandType }) =>
      log.d(`screenVisibility: Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({ screen }) =>
      log.d(`Screen will disappear ${screen}`),
    didDisappear: ({ screen }) =>
      log.d(`Screen disappeared ${screen}`),
  }).register();
}
