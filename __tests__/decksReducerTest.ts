import { deckReducer, INITIAL_STATE } from '../src/redux/decksReducer';
import * as actions from '../src/redux/actions';
import * as T from '../src/types';

describe('deckReducer', () => {
  it('should return the initial state', () => {
    expect(deckReducer(undefined, {})).toEqual(
      INITIAL_STATE,
    );
  });

  const testStateWithOneDeck = deckReducer({}, {
    type: actions.DeckActionType.ADD_DECK,
    payload: {
      name: 'DeckA',
    },
  });

  it('should handle ADD_DECK', () => {
    expect(
      deckReducer({}, {
        type: actions.DeckActionType.ADD_DECK,
        payload: {
          name: 'DeckA',
        },
      }),
    ).toEqual({
      allDecks: [{
        name: 'DeckA',
        freshCards: [],
        correctCards: [],
        incorrectCards: [],
        index: 0,
      }],
    },
    );
  });
  it('should handle ADD_CARD', () => {
    const card: T.Card = {
      cardId: 123,
      question: 'Q',
      answer: 'A',
    };
    expect(
      deckReducer(testStateWithOneDeck, {
        type: actions.DeckActionType.ADD_CARD,
        payload: {
          deckName: 'DeckA',
          cardId: 123,
        },
      }),
    ).toEqual({
      allDecks: [{
        name: 'DeckA',
        freshCards: [123],
        correctCards: [],
        incorrectCards: [],
        index: 0,
      }],
    },
    );
  });

  it('should handle MARK_DONE', () => {
    const stateA = {
      allDecks: [{
        name: 'DeckA',
        freshCards: [123, 222],
        correctCards: [],
        incorrectCards: [],
        index: 0,
      }],
    };
    const stateB = {
      allDecks: [{
        name: 'DeckA',
        freshCards: [123],
        correctCards: [222],
        incorrectCards: [],
        index: 0,
      }],
    };
    const stateC = {
      allDecks: [{
        name: 'DeckA',
        freshCards: [],
        correctCards: [222],
        incorrectCards: [123],
        index: 0,
      }],
    };
    expect(
      deckReducer(stateA, {
        type: actions.DeckActionType.MARK_DONE,
        payload: {
          deckName: 'DeckA',
          cardId: 222,
          correct: true,
        },
      }),
    ).toEqual(stateB);
    expect(
      deckReducer(stateB, {
        type: actions.DeckActionType.MARK_DONE,
        payload: {
          deckName: 'DeckA',
          cardId: 123,
          correct: false,
        },
      }),
    ).toEqual(stateC);
  });

  it('should handle RESET_DECK', () => {
    const stateA = {
      allDecks: [{
        name: 'DeckA',
        freshCards: [123, 222],
        correctCards: [33],
        incorrectCards: [44],
        index: 0,
      }],
    };
    const stateB = {
      allDecks: [{
        name: 'DeckA',
        freshCards: [123, 222, 33, 44],
        correctCards: [],
        incorrectCards: [],
        index: 0,
      }],
    };
    expect(
      deckReducer(stateA, {
        type: actions.DeckActionType.RESET_DECK,
        payload: {
          deckName: 'DeckA',
        },
      }),
    ).toEqual(stateB);
  });
});
