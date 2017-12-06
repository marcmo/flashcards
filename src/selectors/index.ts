import { createSelector, OutputSelector } from 'reselect';
import * as T from '../types';
import * as R from 'ramda';
import { log } from '../lib/Logging';

const findCard = (cardSet: Array<T.Card>, cardId: number): T.Card[] => (
  R.filter((c: T.Card) => c.cardId === cardId, cardSet)
);
const toCardList = (cardSet: Array<T.Card>, cardIds: Array<number>): Array<T.Card> => {
  const res = R.reduce(R.concat, [], R.map(R.curry(findCard)(cardSet), cardIds));
  return res;
};

export const filterFreshCards = (deckName: string, state: T.RootState): Array<T.Card> => {
  const deck = selectDeck(deckName, state.decks)(state.decks);
  const fresh = (deck != null) ? deck.freshCards : [];
  return toCardList(state.cardSet, fresh);
};
export const filterCorrectCards = (deckName: string, state: T.RootState): Array<T.Card> => {
  const deck = selectDeck(deckName, state.decks)(state.decks);
  const correct = (deck != null) ? deck.correctCards : [];
  return toCardList(state.cardSet, correct);
};
export const filterIncorrectCards = (deckName: string, state: T.RootState): Array<T.Card> => {
  const deck = selectDeck(deckName, state.decks)(state.decks);
  const incorrect = (deck != null) ? deck.incorrectCards : [];
  return toCardList(state.cardSet, incorrect);
};

const getAllDecks = (deckState: T.DeckState) => deckState.allDecks;

export const selectDeck = (deckName: string, state: T.DeckState) => {
  // OutputSelector<T.RootState, T.Deck | undefined, (res: T.Deck[]) => T.Deck | undefined> => {
  return createSelector([getAllDecks], (allDecks) =>
    R.head(R.filter((d: T.Deck) => d.name === deckName, allDecks)),
  );
};
// const getVisibilityFilter = (state: T.RootState) => state.visibilityFilter
// const getTodos = (state) => state.todos
//
// export const getVisibleTodos = createSelector(
//   [getVisibilityFilter, getTodos],
//   (visibilityFilter, todos) => {
//     switch (visibilityFilter) {
//       case 'SHOW_ALL':
//         return todos
//       case 'SHOW_COMPLETED':
//         return todos.filter(t => t.completed)
//       case 'SHOW_ACTIVE':
//         return todos.filter(t => !t.completed)
//     }
//   }
// )
