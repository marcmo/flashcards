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
import * as selectors from '../selectors';
import { getIcon } from '../lib/appIcons';
import { log } from '../lib/Logging';
export { };

const dimWidth = Dimensions.get('window').width;

interface Props {
  updateCardIndex: (cardName: string, index: number) => any;
  markAsDone: (deckName: string, cardId: number, correct: boolean) => any;
  resetDeck: (deckName: string) => any;
  nameOfDeck: string;
  freshCards: Array<Card>;
  correctCards: Array<Card>;
  incorrectCards: Array<Card>;
  cardIndex: number;
  navigator: N.Navigator;
}

interface State {
  side: 'Question' | 'Answer';
}
class QuizScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      side: 'Question',
    };
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
  getFormattedAnswer = (q: string): string => (q.endsWith('!') ? q : `${q}!`);

  cardDone = (cardId: number, correct: boolean) => {
    this.props.markAsDone(this.props.nameOfDeck, cardId, correct);
    this.props.updateCardIndex(
      this.props.nameOfDeck,
      (this.props.cardIndex + 1) % this.props.freshCards.length);
  }
  getLinktext = () => (this.state.side === 'Question' ? 'answer' : 'question');
  flipCard = () => (this.setState((prevState: State) => ({ side: prevState.side === 'Question' ? 'Answer' : 'Question' })));

  renderCard = () => {
    const currentCard: Card | undefined = R.head(this.props.freshCards);
    return (
      (currentCard != null)
        ?
        (this.state.side === 'Question')
          ?
          (
            <View style={styles.container} >
              <View style={styles.headerContainer}>
                <Text style={styles.header}>{this.props.correctCards.length + this.props.incorrectCards.length}/{this.props.freshCards.length}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.questionText}>{this.getFormattedQuestion(currentCard.question)}</Text>
                <RoundedButton
                  text={this.getLinktext()}
                  passedStyle={styles.flipButton}
                  passedTextStyle={styles.resetButtonText}
                  onPress={() => this.flipCard()}
                />
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
                {this.props.correctCards.length + this.props.incorrectCards.length > 0 &&
                  <RoundedButton
                    text="Reset Deck"
                    passedStyle={styles.resetButton}
                    passedTextStyle={styles.resetButtonText}
                    onPress={() => this.props.resetDeck(this.props.nameOfDeck)}
                  />
                }
              </View>
            </View >
          )
          :
          (
            <View style={styles.container} >
              <View style={styles.contentContainer}>
                <Text style={styles.questionText}>{this.getFormattedAnswer(currentCard.answer)}</Text>
                <RoundedButton
                  text={this.getLinktext()}
                  passedStyle={styles.flipButton}
                  passedTextStyle={styles.resetButtonText}
                  onPress={() => this.flipCard()}
                />
              </View >
            </View >
          )
        :
        (
          <View style={styles.container} >
            <Text>Error for {this.props.nameOfDeck}!!</Text>
          </View >
        )
    );
  }

  render() {
    return (
      (this.props.freshCards.length === 0)
        ? (
          <View style={styles.container} >
            <View style={styles.contentContainer}>
              <Text style={styles.cardText}>Quiz for {this.props.nameOfDeck} done</Text>
              <Text
                style={styles.cardText}
              >
                {this.props.correctCards.length} out of {this.props.correctCards.length + this.props.incorrectCards.length} were correct!
              </Text>
              <RoundedButton
                text="Play again"
                passedStyle={styles.resetButton}
                passedTextStyle={styles.resetButtonText}
                onPress={() => this.props.resetDeck(this.props.nameOfDeck)}
              />
            </View >
          </View >
        )
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
    backgroundColor: Colors.snow,
  },
  contentContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.snow,
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
    ...Fonts.style.normal,
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
  resetButton: {
    borderColor: Colors.coal,
    borderWidth: 2,
    width: dimWidth * .6,
    height: 50,
    backgroundColor: Colors.snow,
  },
  flipButton: {
    borderColor: Colors.coal,
    borderWidth: 1,
    width: dimWidth * .4,
    height: 50,
    backgroundColor: Colors.snow,
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
  },
  resetButtonText: {
    color: Colors.coal,
  },
  icon: {
    fontSize: 30,
    margin: 30,
  },
});

const getCardIndex = (deckName: string, allDecks: Array<Deck>): number => {
  const deck = R.head(R.filter((d: Deck) => d.name === deckName, allDecks));
  return (deck != null) ? deck.index : 0;
};
interface OwnProps {
  nameOfDeck: string;
}
const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return {
    freshCards: selectors.filterFreshCards(ownProps.nameOfDeck, state),
    correctCards: selectors.filterCorrectCards(ownProps.nameOfDeck, state),
    incorrectCards: selectors.filterIncorrectCards(ownProps.nameOfDeck, state),
    cardIndex: getCardIndex(ownProps.nameOfDeck, state.decks.allDecks),
  };
};
const mapDispatchToProps = (dispatch) => ({
  updateCardIndex: (deckName: string, index: number) => dispatch(actions.createUpdateDeckIndexAction(deckName, index)),
  markAsDone: (deckName: string, cardId: number, correct: boolean) =>
    dispatch(actions.createMarkDoneAction(deckName, cardId, correct)),
  resetDeck: (deckName: string) => dispatch(actions.createResetDeckAction(deckName)),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);
