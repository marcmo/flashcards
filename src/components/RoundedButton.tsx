import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../themes/';
import { Text, TouchableOpacity } from 'react-native';

interface RoundedButtonProps {
  onPress: () => void;
  text: string;
  passedStyle?: object;
  passedTextStyle?: object;
  children?: string;
  navigator?: object;
}
export const RoundedButton: React.SFC<RoundedButtonProps> =
  ({ onPress, text, passedStyle, passedTextStyle, children }) => {

  const getText = (): string => {
    const buttonText: string = (typeof children === 'undefined')
      ? text || children || ''
      : text || '';
    return buttonText.toUpperCase();
  };

  return (
    <TouchableOpacity style={[styles.button, passedStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, passedTextStyle]}>{getText()}</Text>
    </TouchableOpacity>
  );
};
export default RoundedButton;

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.fire,
    justifyContent: 'center',
  },
  buttonDisabled: {
    height: 45,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.asbestos,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.section,
  },
  buttonDisabledText: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.section,
  },
});
