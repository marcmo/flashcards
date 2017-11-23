import * as React from 'react';
import {Platform, StyleSheet, ScrollView} from 'react-native';
import * as N from 'react-native-navigation';
import Row from '../components/Row';

import CodePush from 'react-native-code-push';

const CodePushLocalConfig = {
  updateDialog: CodePush.DEFAULT_UPDATE_DIALOG,
  installMode: CodePush.InstallMode.IMMEDIATE,
  deploymentKey: Platform.select({
    android: '0jZ6KTNRX6B7yx7gx-mkhTiGbMCrSJwiQxXgf',
    ios: 'not known yet...find out',
  }),
};

interface Props {
  navigator: N.Navigator;
}
class NavigationTypes extends React.Component<Props, any> {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  checkForUpdates = () => {
    CodePush.sync(CodePushLocalConfig);
  }

  componentWillMount() {
    this.checkForUpdates();
  }

  onNavigatorEvent(event) {
    if (event.type === 'DeepLink') {
      const parts = event.link.split('/');
      if (parts[0] === 'tab1') {
        this.props.navigator.push({
          screen: parts[1],
        });
      }
    }
  }

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });
  }

  dismissLightBox = () => {
    this.props.navigator.dismissLightBox();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Row title={'Toggle Drawer6'} onPress={this.toggleDrawer}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.054)',
  },
  text: {
    fontSize: 16,
  },
});

export default NavigationTypes;
