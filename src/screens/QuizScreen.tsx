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
  Dimensions,
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
export { };

const dimWidth = Dimensions.get('window').width;

interface Props {
  updateCardIndex: (cardName: string, index: number) => any;
  markAsDone: (deckName: string, cardId: number, correct: boolean) => any;
  nameOfDeck: string;
  freshCards: Array<Card>;
  correctCards: Array<Card>;
  incorrectCards: Array<Card>;
  cardIndex: number;
  navigator: N.Navigator;
}

class QuizScreen extends React.Component<Props, object> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        this.props.navigator.dismissModal();
      }
    }
  }

  getFormattedQuestion = (q: string): string => (q.endsWith('?') ? q : `${q}?`);

  cardDone = (cardId: number, correct: boolean) => {
    this.props.markAsDone(this.props.nameOfDeck, cardId, correct);
    this.props.updateCardIndex(
      this.props.nameOfDeck,
      (this.props.cardIndex + 1) % this.props.freshCards.length);
  }

  renderCard = () => {
    const currentCard: Card | undefined = R.head(this.props.freshCards);
    return (
      (currentCard != null)
        ?
        (
          <View style={styles.container} >
            <View style={styles.headerContainer}>
              <Text style={styles.header}>{this.props.correctCards.length + this.props.incorrectCards.length}/{this.props.freshCards.length}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.questionText}>{this.getFormattedQuestion(currentCard.question)}</Text>
              <RoundedButton
                text="Correct"
                passedStyle={styles.correctButton}
                passedTextStyle={styles.buttonText}
                onPress={() => this.cardDone(currentCard.cardId, true)}
              />
              <RoundedButton
                text="Incorrect"
                passedStyle={styles.incorrectButton}
                onPress={() => this.cardDone(currentCard.cardId, false)}
              />
            </View>
          </View >
        )
        :
        (
          <View style={styles.container} >
            <Text>Error for {this.props.nameOfDeck}!!</Text>
          </View >)
      );
  }

  render() {
    return (
      (this.props.freshCards.length === 0)
        ? (
          <View style={styles.container} >
            <Text>Quiz for {this.props.nameOfDeck} empty!</Text>
          </View >)
        : this.renderCard()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: 'orange',
  },
  contentContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
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
  questionText: {
    ...Fonts.style.h1,
  },
  cardText: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
  },
  header: {
    ...Fonts.style.h5,
  },
  correctButton: {
    backgroundColor: Colors.emerald,
    width: dimWidth * .6,
  },
  incorrectButton: {
    backgroundColor: Colors.bloodOrange,
    width: dimWidth * .6,
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

const findCard = (cardSet: Array<Card>, cardId: number): Card[] => (
  R.filter((c: Card) => c.cardId === cardId, cardSet)
);
const toCardList = (cardSet: Array<Card>, cardIds: Array<number>): Array<Card> => {
  log.d('toCardList, cardSet:', cardSet);
  log.d('toCardList, cardIds:', cardIds);
  const res = R.reduce(R.concat, [], R.map(R.curry(findCard)(cardSet), cardIds));
  log.d('toCardList:', res);
  return res;
};
const filterDeckCards = (deckName: string, allDecks: Array<Deck>, cardSet: Array<Card>): [Array<Card>, Array<Card>, Array<Card>] => {
  const deck = R.head(R.filter((d: Deck) => d.name === deckName, allDecks));
  const fresh = (deck != null) ? deck.freshCards : [];
  const correct = (deck != null) ? deck.correctCards : [];
  const incorrect = (deck != null) ? deck.incorrectCards : [];
  return [toCardList(cardSet, fresh), toCardList(cardSet, correct), toCardList(cardSet, incorrect)];
};
const getCardIndex = (deckName: string, allDecks: Array<Deck>): number => {
  const deck = R.head(R.filter((d: Deck) => d.name === deckName, allDecks));
  return (deck != null) ? deck.index : 0;
};
interface OwnProps {
  nameOfDeck: string;
}
const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const [freshCards, correctCards, incorrectCards] = filterDeckCards(ownProps.nameOfDeck, state.decks.allDecks, state.cardSet);
  log.d('freshCards:', freshCards);
  log.d('correctCards:', correctCards);
  log.d('incorrectCards:', incorrectCards);
  return {
    freshCards,
    correctCards,
    incorrectCards,
    cardIndex: getCardIndex(ownProps.nameOfDeck, state.decks.allDecks),
  };
};
const mapDispatchToProps = (dispatch) => ({
  updateCardIndex: (deckName: string, index: number) => dispatch(actions.createUpdateDeckIndexAction(deckName, index)),
  markAsDone: (deckName: string, cardId: number, correct: boolean) =>
    dispatch(actions.createMarkDoneAction(deckName, cardId, correct)),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);
