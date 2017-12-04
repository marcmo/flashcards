import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { Colors } from '../themes';
import { log } from '../lib/Logging';
import { RoundedButton } from '../components/RoundedButton';
import { createAddDeckAction } from '../redux/actions';

const renderInput: React.StatelessComponent<any> = ({ input: { onChange, ...restInput } }) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      {...restInput}
      underlineColorAndroid="transparent"
    />
  );
};

class Form extends React.Component<any, object> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  submit = (values, dispatch) => {
    log.d('submitting form', values);
    dispatch(createAddDeckAction(values.deckname));
    this.props.navigator.dismissModal();
  }

  _onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        this.props.navigator.dismissModal();
      }
    }
  }
  componentWillMount() {
    navigator = this.props.navigator;
    this.setState({ isReady: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>new deck name:</Text>
        <Field
          name="deckname"
          component={renderInput}
        />
        <RoundedButton text="Submit" onPress={this.props.handleSubmit(this.submit)} />
      </View>
    );
  }
}

export default reduxForm({
  form: 'addDeck',
})(Form);

const styles = StyleSheet.create({
  buttonContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.snow,
    flex: 1,
    alignItems: 'center',
  },
  input: {
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
