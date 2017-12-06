import * as T from '../types';
import * as Redux from 'redux';
import * as actions from './actions';
import * as R from 'ramda';
import { selectDeck } from '../selectors';
import { log } from '../lib/Logging';

const ALL_DECKS = [{
  name: 'udacicards',
  freshCards: ([] as Array<number>),
  correctCards: ([] as Array<number>),
  incorrectCards: ([] as Array<number>),
  index: 0,
}, {
  name: 'mycards',
  freshCards: ([] as Array<number>),
  correctCards: ([] as Array<number>),
  incorrectCards: ([] as Array<number>),
  index: 0,
},
];
export const INITIAL_STATE: T.DeckState = {
  allDecks: (ALL_DECKS as Array<T.Deck>),
};

type DeckReducer = Redux.Reducer<T.DeckState>;
// export const deckReducer: DeckReducer =
// (state = INITIAL_STATE, action: any): T.DeckState => {
export const deckReducer: any =
  (state = INITIAL_STATE, action: actions.DeckAction): T.DeckState => {
    switch (action.type) {
      case actions.DeckActionType.ADD_DECK:
        return {
          ...state,
          allDecks: R.append({
            name: action.payload.name,
            freshCards: ([] as Array<number>),
            correctCards: ([] as Array<number>),
            incorrectCards: ([] as Array<number>),
            index: 0,
          }, state.allDecks),
        };
      case actions.DeckActionType.ADD_CARD:
        {
          const deck: T.Deck | undefined = R.head(R.filter((d: T.Deck) => d.name === action.payload.deckName, state.allDecks));
          if (deck == null) {
            log.w(`could not find a deck with name ${action.payload.deckName}`);
            return state;
          }
          const restDecks = R.filter((d: T.Deck) => d.name !== action.payload.deckName, state.allDecks);
          const newDeck = { ...deck, freshCards: R.append(action.payload.cardId, deck.freshCards) };
          return {
            ...state,
            allDecks: R.append(newDeck, restDecks),
          };
        }
      case actions.DeckActionType.CHANGE_DECK:
        return {
          ...state,
          currentDeckName: action.payload.deckName,
        };
      case actions.DeckActionType.UPDATE_DECK_INDEX:
        {
          const deck = selectDeck(action.payload.deckName, state)(state);
          if (deck == null) {
            log.w(`could not find a deck with name ${action.payload.deckName}`);
            return state;
          }
          const restDecks = R.filter((d: T.Deck) => d.name !== action.payload.deckName, state.allDecks);
          const newDeck = { ...deck, index: action.payload.index };
          return {
            ...state,
            allDecks: R.append(newDeck, restDecks),
          };
        }
      case actions.DeckActionType.MARK_DONE:
        {
          const deck = selectDeck(action.payload.deckName, state)(state);
          if (deck == null) {
            log.w(`could not find a deck with name ${action.payload.deckName}`);
            return state;
          }
          const newFreshCards = R.filter((cardId: number) => cardId !== action.payload.cardId, deck.freshCards);
          const cardsToMove = R.filter((cardId: number) => cardId === action.payload.cardId, deck.freshCards);
          const restDecks = R.filter((d: T.Deck) => d.name !== action.payload.deckName, state.allDecks);
          if (action.payload.correct) {
            const newCorrectCards = R.concat(cardsToMove, deck.correctCards);
            const newDeck = { ...deck, freshCards: newFreshCards, correctCards: newCorrectCards };
            return {
              ...state,
              allDecks: R.append(newDeck, restDecks),
            };
          } else {
            const newIncorrectCards = R.concat(cardsToMove, deck.incorrectCards);
            const newDeck = { ...deck, freshCards: newFreshCards, incorrectCards: newIncorrectCards };
            return {
              ...state,
              allDecks: R.append(newDeck, restDecks),
            };
          }
        }
      case actions.DeckActionType.RESET_DECK:
        {
          const deck = selectDeck(action.payload.deckName, state)(state);
          if (deck == null) {
            log.w(`could not find a deck with name ${action.payload.deckName}`);
            return state;
          }
          const restDecks = R.filter((d: T.Deck) => d.name !== action.payload.deckName, state.allDecks);
          const newDeck = {
            ...deck,
            freshCards: R.reduce(R.concat, [], [deck.freshCards, deck.correctCards, deck.incorrectCards]),
            correctCards: [] as number[],
            incorrectCards: [] as number[],
          };
          return {
            ...state,
            allDecks: R.append(newDeck, restDecks),
          };
        }
      default:
        return state;
    }
  };
