import { DeckState } from '../types';
import * as Redux from 'redux';
import * as actions from './actions';
import * as R from 'ramda';

export const INITIAL_STATE: DeckState = {
  allDecks: [],
};

type DeckReducer = Redux.Reducer<DeckState>;
export const deckReducer: DeckReducer =
  (state = INITIAL_STATE, action: actions.DeckAction): DeckState => {
  switch (action.type) {
    case actions.DeckActionType.ADD_DECK:
      return {
        ...state,
        allDecks: R.append({
          name: action.payload.name,
          cards: [],
        }, state.allDecks),
      };
    default:
      return state;
  }
};
