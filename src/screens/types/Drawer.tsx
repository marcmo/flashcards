import * as React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as N from 'react-native-navigation';
import Crashes from 'appcenter-crashes';
import Push from 'appcenter-push';
import { log } from '../../lib/Logging';

interface Props {
  navigator: N.Navigator;
}
interface State {
  pushEnabled: boolean;
}
class MyClass extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      pushEnabled: false,
    };
    this.toggleEnabled = this.toggleEnabled.bind(this);
  }

  async componentDidMount() {
    const component = this;

    const pushEnabled = await Push.isEnabled();
    log.d(`componentDidMount: pushEnabled: ${pushEnabled}`);
    component.setState({ pushEnabled });
  }

  async toggleEnabled() {
    await Push.setEnabled(!this.state.pushEnabled);

    const pushEnabled = await Push.isEnabled();
    log.d(`toggleEnabled: pushEnabled: ${pushEnabled}`);
    this.setState({ pushEnabled });
  }
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
        <Text>Push enabled: {this.state.pushEnabled ? 'yes' : 'no'}</Text>
        <View style={styles.button}>
          <Button
            onPress={this.toggleEnabled}
            title="toggle enabled"
          />
        </View>
      </View >
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
