import * as T from '../types';
import * as Redux from 'redux';
import * as actions from './actions';
import * as R from 'ramda';
import { log } from '../lib/Logging';

export const INITIAL_STATE: Array<T.Card> = [];

type CardReducer = Redux.Reducer<Array<T.Card>>;
// export const cardReducer: CardReducer =
  // (state = INITIAL_STATE, action: any): T.CardState => {
export const cardReducer: any =
  (state = INITIAL_STATE, action: actions.CardAction): Array<T.Card> => {
    switch (action.type) {
      case actions.CardActionType.CREATE_CARD:
        {
          const newCard: T.Card = {
            cardId: action.payload.cardId,
            question: action.payload.question,
            answer: action.payload.answer,
          };
          return R.append(newCard, state);
        }
      default:
        return state;
    }
  };
