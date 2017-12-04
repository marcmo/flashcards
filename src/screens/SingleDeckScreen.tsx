import * as React from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  ListRenderItemInfo,
  SectionListData,
  TouchableOpacity,
} from 'react-native';
import * as N from 'react-native-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import createStore from '../redux';
import * as actions from '../redux/actions';
import * as R from 'ramda';
import { RootState, Deck, Card } from '../types';
import { RoundedButton } from '../components/RoundedButton';
import { Fonts, Colors, Metrics } from '../themes/';
import { getIcon } from '../lib/appIcons';
import { log } from '../lib/Logging';

interface Props {
  createCard: (name: string, question: string, answer: string) => void;
  nameOfDeck: string;
  cards: Array<Card>;
  navigator: N.Navigator;
}
const SingleDeckScreen: React.SFC<Props> = (props: Props) => {

  return (
    <View style={styles.container} >
      <Text>{props.nameOfDeck}</Text>
      <Text>{props.cards.length} cards</Text>
      <RoundedButton text="Add Card" onPress={() => props.createCard(props.nameOfDeck, 'question', 'answer')} />
      <RoundedButton text="Start Quiz" onPress={() => props.createCard(props.nameOfDeck, 'question', 'answer')} />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
  },
  formContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  text: {
    fontSize: Fonts.size.input,
  },
  cardText: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
  },
  header: {
    fontSize: Fonts.size.h5,
  },
  addButton: {
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: Colors.charcoal,
    borderRadius: 100,
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
  },
  icon: {
    fontSize: 30,
    margin: 30,
  },
});

const filterDeckCards = (deckName: string, allDecks: Array<Deck>): Array<Card> => {
  const deck = R.head(R.filter((d: Deck) => d.name === deckName, allDecks));
  return (deck != null) ? deck.cards : [];
};
interface OwnProps {
  nameOfDeck: string;
}
const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  cards: filterDeckCards(ownProps.nameOfDeck, state.decks.allDecks),
});
const mapDispatchToProps = (dispatch) => ({
  createCard: (name: string, question: string, answer: string) => dispatch(actions.createAddCardAction(name, question, answer)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SingleDeckScreen);
