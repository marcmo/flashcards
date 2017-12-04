import { log } from '../lib/Logging';
export enum DeckActionType {
  ADD_DECK = 'ADD_DECK',
  ADD_CARD = 'ADD_CARD',
}
export interface AddCard {
  type: DeckActionType.ADD_CARD;
  payload: {
    deckName: string;
    question: string;
    answer: string;
  };
}
export interface AddDeck {
  type: DeckActionType.ADD_DECK;
  payload: {
    name: string;
  };
}
export type DeckAction =
  AddCard |
  AddDeck;

export const createAddDeckAction = (name: string): AddDeck => ({
  type: DeckActionType.ADD_DECK,
  payload: {
    name,
  },
});
export const createAddCardAction = (deckName: string, question: string, answer: string): AddCard => ({
  type: DeckActionType.ADD_CARD,
  payload: {
    deckName,
    question,
    answer,
  },
});
