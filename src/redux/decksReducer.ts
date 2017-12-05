import * as T from '../types';
import * as Redux from 'redux';
import * as actions from './actions';
import * as R from 'ramda';
import { log } from '../lib/Logging';

const ALL_DECKS = [{
    name: 'udacicards',
    cards: ([] as Array<T.Card>),
  }, {
    name: 'mycards',
    cards: ([] as Array<T.Card>),
  },
  ];
export const INITIAL_STATE: T.DeckState = {
  allDecks: (ALL_DECKS as Array<T.Deck>),
};

type DeckReducer = Redux.Reducer<T.DeckState>;
export const deckReducer: DeckReducer =
  // (state = INITIAL_STATE, action: any): T.DeckState => {
  (state = INITIAL_STATE, action: actions.RootAction): T.DeckState => {
    switch (action.type) {
      case actions.RootActionType.ADD_DECK:
        log.w('in reducer ADD_DECK');
        return {
          ...state,
          allDecks: R.append({
            name: action.payload.name,
            cards: ([] as Array<T.Card>),
          }, state.allDecks),
        };
      case actions.RootActionType.ADD_CARD:
        {
          const deck: T.Deck | undefined = R.head(R.filter((d: T.Deck) => d.name === action.payload.deckName, state.allDecks));
          if (deck == null) { return state; }
          const restDecks = R.filter((d: T.Deck) => d.name !== action.payload.deckName, state.allDecks);
          const newCard: T.Card = { question: action.payload.question, answer: action.payload.answer };
          const newDeck = { ...deck, cards: R.append(newCard, deck.cards) };
          return {
            ...state,
            allDecks: R.append(newDeck, restDecks),
          };
        }
      case actions.RootActionType.CHANGE_DECK:
        return {
          ...state,
          currentDeckName: action.payload.deckName,
        };
      default:
        return state;
    }
  };
