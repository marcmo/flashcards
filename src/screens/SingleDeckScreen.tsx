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

const dimWidth = Dimensions.get('window').width;

interface Props {
  nameOfDeck: string;
  freshCardsCount: number;
  correctCardsCount: number;
  incorrectCardsCount: number;
  resetDeck: (deckName: string) => any;
  navigator: N.Navigator;
}

class SingleDeckScreen extends React.Component<Props, object> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  showQuiz = (deckName: string) => {
    this.props.navigator.showModal({
      screen: 'flashcards.QuizScreen',
      title: `${deckName}`,
      passProps: {
        nameOfDeck: deckName,
      },
      navigatorButtons: {
        rightButtons: [
          {
            id: 'close',
            icon: getIcon('ios-arrow-down'),
          },
        ],
      },
    });
  }
  showModal = () => {
    this.props.navigator.showModal({
      screen: 'flashcards.AddCardScreen',
      title: 'Add Identity',
      navigatorButtons: {
        rightButtons: [
          {
            id: 'close',
            icon: getIcon('ios-close'),
          },
        ],
      },
    });
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        this.props.navigator.pop();
      }
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.titleText}>{this.props.nameOfDeck}</Text>
        <Text
          style={styles.countText}
        >
          {this.props.freshCardsCount} to go ({this.props.correctCardsCount} correct, {this.props.incorrectCardsCount} incorrect)
        </Text>
        <RoundedButton
          text="Add Card"
          passedStyle={styles.addButton}
          passedTextStyle={styles.buttonText}
          onPress={() => this.showModal()}
        />
        <RoundedButton
          text="Start Quiz"
          passedStyle={styles.button}
          onPress={() => this.showQuiz(this.props.nameOfDeck)}
        />
        {this.props.correctCardsCount + this.props.incorrectCardsCount > 0 &&
          (
            <RoundedButton
              text="Reset Deck"
              passedStyle={styles.button}
              onPress={() => this.props.resetDeck(this.props.nameOfDeck)}
            />
          )
        }
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  titleText: {
    ...Fonts.style.h1,
    color: Colors.panther,
    marginBottom: Metrics.section,
  },
  countText: {
    ...Fonts.style.normal,
    color: Colors.text,
    marginBottom: Metrics.doubleSection,
  },
  cardText: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
  },
  header: {
    fontSize: Fonts.size.h5,
  },
  button: {
    backgroundColor: Colors.coal,
    width: dimWidth * .6,
    height: 50,
  },
  addButton: {
    borderColor: Colors.coal,
    borderWidth: 2,
    width: dimWidth * .6,
    height: 50,
    backgroundColor: Colors.snow,
  },
  buttonText: {
    color: Colors.coal,
  },
  icon: {
    fontSize: 30,
    margin: 30,
  },
});

const findDeck = (deckName: string, allDecks: Array<Deck>): Deck | undefined => (
  R.head(R.filter((d: Deck) => d.name === deckName, allDecks))
);
const filterFreshCards = (deckName: string, allDecks: Array<Deck>): number => {
  const deck = findDeck(deckName, allDecks);
  return (deck != null) ? deck.freshCards.length : 0;
};
const filterCorrectCards = (deckName: string, allDecks: Array<Deck>): number => {
  const deck = findDeck(deckName, allDecks);
  return (deck != null) ? deck.correctCards.length : 0;
};
const filterIncorrectCards = (deckName: string, allDecks: Array<Deck>): number => {
  const deck = findDeck(deckName, allDecks);
  return (deck != null) ? deck.incorrectCards.length : 0;
};
interface OwnProps {
  nameOfDeck: string;
}
const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  freshCardsCount: filterFreshCards(ownProps.nameOfDeck, state.decks.allDecks),
  correctCardsCount: filterCorrectCards(ownProps.nameOfDeck, state.decks.allDecks),
  incorrectCardsCount: filterIncorrectCards(ownProps.nameOfDeck, state.decks.allDecks),
});
const mapDispatchToProps = (dispatch) => ({
  resetDeck: (deckName: string) => dispatch(actions.createResetDeckAction(deckName)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SingleDeckScreen);
