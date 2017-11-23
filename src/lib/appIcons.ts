import { PixelRatio, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { log } from '../lib/Logging';

export const navIconSize = (__DEV__ === false && Platform.OS === 'android') ? PixelRatio.getPixelSizeForLayoutSize(40) : 40;
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  'ios-menu': [30],
  'ios-cog': [30],
  'md-menu': [30],
  'md-car': [30],
  'ios-close': [30],
  'ios-car': [30],
  'ios-wifi': [30],
  'ios-radio': [30],
  'md-globe': [30],
  'md-list': [30],
  'md-trash': [30],
  'ios-navigate': [30],
  'ios-arrow-down': [35],
  'ios-people': [30],
  'ios-star-half': [30],
};

const iconsMap = {};
const iconsLoaded = new Promise((resolve, reject) => {
  Promise.all(
    Object.keys(icons).map((iconName) =>
      // IconName--suffix--other-suffix is just the mapping name in iconsMap
      Ionicons.getImageSource(
        iconName.replace(replaceSuffixPattern, ''),
        icons[iconName][0],
        icons[iconName][1],
      )),
  ).then((sources) => {
    Object.keys(icons)
      .forEach((iconName, idx) => (iconsMap[iconName] = sources[idx]));

    resolve(true);
  });
});
const getIcon = (name: string) => {
  if (name in iconsMap) {
      return lookupIcon(name);
  }
  log.w(`nothing in iconsMap for ${name}: ${JSON.stringify(iconsMap, null, 4)}`);
  return require('../assets/icons/car.png');
};

export {
  iconsMap,
  getIcon,
  iconsLoaded,
};
function lookupIcon(name: string) {
  return iconsMap[name];
}
