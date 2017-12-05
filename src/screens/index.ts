import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';
import * as Redux from 'redux';
import DecksScreen from './DecksScreen';
import SingleDeckScreen from './SingleDeckScreen';
import QuizScreen from './QuizScreen';
import AddDeckScreen from '../components/AddDeckModal';
import { RootState } from '../types';
import CodePush from 'react-native-code-push';
import { log } from '../lib/Logging';
import Drawer from './types/Drawer';
import Modal from './types/Modal';

export const CodePushConfig = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
};

export const registerScreens = (store: Redux.Store<RootState>, provider) => {
  Navigation.registerComponent('flashcards.DecksScreen', () => CodePush(CodePushConfig)(DecksScreen), store, provider);
  Navigation.registerComponent('flashcards.SingleDeckScreen', () => SingleDeckScreen, store, provider);
  Navigation.registerComponent('flashcards.QuizScreen', () => QuizScreen, store, provider);
  Navigation.registerComponent('flashcards.AddDeckScreen', () => AddDeckScreen, store, provider);
  Navigation.registerComponent('flashcards.Types.Drawer', () => Drawer);
  Navigation.registerComponent('flashcards.Types.Modal', () => Modal);
};

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
