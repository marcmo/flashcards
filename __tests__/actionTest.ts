import * as actions from '../src/redux/actions';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs';
    const payload = {
      cardId: 42,
      deckName: 'abc',
      question: 'A',
      answer: 'B',
    };
    const expectedAction = {
      type: actions.CardActionType.CREATE_CARD,
      payload,
    };
    expect(actions.createCreateCardAction(
      payload.deckName,
      payload.cardId,
      payload.question,
      payload.answer)).toEqual(expectedAction);
  });
});
