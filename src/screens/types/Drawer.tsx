import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import * as N from 'react-native-navigation';
import Crashes from 'appcenter-crashes';

interface Props {
  navigator: N.Navigator;
}
class MyClass extends React.Component<Props, any> {

  onShowModal = () => {
    this.toggleDrawer();
    this.props.navigator.showModal({
      screen: 'flashcards.Types.Modal',
      title: `Modal`,
    });
  }

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
    });
  }

  javascriptCrash = () => {
    throw new Error('this is a test javascript crash');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>test drawer</Text>
        <View style={styles.button}>
          <Button
            onPress={this.onShowModal}
            title="Show Modal"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={Crashes.generateTestCrash}
            title="generate test crash"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.javascriptCrash}
            title="generate javascript crash"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 16,
  },
});

export default MyClass;
