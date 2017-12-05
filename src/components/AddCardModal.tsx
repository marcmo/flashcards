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
import { createAddCardAction } from '../redux/actions';
import * as N from 'react-native-navigation';
import { connect } from 'react-redux';
import * as T from '../types';

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

interface Props {
  deckName?: string;
  navigator: N.Navigator;
}
class Form extends React.Component<any, object> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  submit = (values, dispatch) => {
    dispatch(createAddCardAction(this.props.deckName, values.question, values.answer));
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
    this.setState({ isReady: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>question:</Text>
        <Field
          name="question"
          component={renderInput}
        />
        <Text>answer:</Text>
        <Field
          name="answer"
          component={renderInput}
        />
        <RoundedButton text="Submit" onPress={this.props.handleSubmit(this.submit)} />
      </View>
    );
  }
}

const mapStateToProps = (state: T.RootState) => ({
  deckName: state.decks.currentDeckName,
});

const mapDispatchToProps = (dispatch)  => ({
    // ...
});

const ConnectedForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Form);

export default reduxForm({
  form: 'addCard',
})(ConnectedForm as any);

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
