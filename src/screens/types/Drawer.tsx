import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import * as N from 'react-native-navigation';

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

  render() {
    return (
      <View style={styles.container}>
        <Text>hello drawer</Text>
        <View style={styles.button}>
          <Button
            onPress={this.onShowModal}
            title="Show Modal"
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
