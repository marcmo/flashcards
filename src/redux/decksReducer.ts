import * as T from '../types';
import * as Redux from 'redux';
import * as actions from './actions';
import * as R from 'ramda';

export const INITIAL_STATE: T.DeckState = {
  allDecks: [{
    name: 'udacicards',
    cards: [],
  }, {
    name: 'mycards',
    cards: [],
  },
  ],
};

type DeckReducer = Redux.Reducer<T.DeckState>;
export const deckReducer: DeckReducer =
  (state = INITIAL_STATE, action: actions.DeckAction): T.DeckState => {
  switch (action.type) {
    case actions.DeckActionType.ADD_DECK:
      return {
        ...state,
        allDecks: R.append({
          name: action.payload.name,
          cards: [],
        }, state.allDecks),
      };
    case actions.DeckActionType.ADD_CARD:
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
    default:
      return state;
  }
};
