import * as selectors from '../src/selectors';
import * as T from '../src/types';

describe('selectors', () => {
  const card1: T.Card = { cardId: 1, question: 'Q', answer: 'A' };
  const card2: T.Card = { cardId: 2, question: 'Q2', answer: 'A2' };
  const card3: T.Card = { cardId: 3, question: 'Q3', answer: 'A3' };
  const deckA = {
    name: 'DeckA',
    freshCards: [1],
    correctCards: [2],
    incorrectCards: [],
    index: 0,
  };
  const deckB = {
    name: 'DeckB',
    freshCards: [3],
    correctCards: [],
    incorrectCards: [],
    index: 0,
  };
  const deckState: T.DeckState = {
    allDecks: [deckA, deckB],
  };
  const rootState: T.RootState = {
    decks: deckState,
    cardSet: [card1, card2],
  };

  it('should select correct deck', () => {
    expect(selectors.selectDeck('DeckA', deckState)(deckState))
      .toEqual(deckA);
  });

  it('should select fresh cards', () => {
    expect(selectors.filterFreshCards('DeckA', rootState))
      .toEqual(expect.arrayContaining([card1]));
  });

  it('should select correct cards', () => {
    expect(selectors.filterCorrectCards('DeckA', rootState))
      .toEqual(expect.arrayContaining([card2]));
  });

  it('should select incorrect cards', () => {
    expect(selectors.filterIncorrectCards('DeckA', rootState))
      .toEqual(expect.arrayContaining([]));
  });
});
