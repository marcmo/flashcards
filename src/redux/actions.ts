import { log } from '../lib/Logging';
export enum RootActionType {
  ADD_DECK = 'ADD_DECK',
  ADD_CARD = 'ADD_CARD',
  CHANGE_DECK = 'CHANGE_DECK',
}
export interface AddCard {
  type: RootActionType.ADD_CARD;
  payload: {
    deckName: string;
    question: string;
    answer: string;
  };
}
export interface AddDeck {
  type: RootActionType.ADD_DECK;
  payload: {
    name: string;
  };
}
export interface ChangeDeck {
  type: RootActionType.CHANGE_DECK;
  payload: {
    deckName: string;
  };
}
export type RootAction =
  ChangeDeck |
  AddCard |
  AddDeck;

export const createChangeDeckAction = (deckName: string): ChangeDeck => ({
  type: RootActionType.CHANGE_DECK,
  payload: {
    deckName,
  },
});
export const createAddDeckAction = (name: string): AddDeck => ({
  type: RootActionType.ADD_DECK,
  payload: {
    name,
  },
});
export const createAddCardAction = (deckName: string, question: string, answer: string): AddCard => ({
  type: RootActionType.ADD_CARD,
  payload: {
    deckName,
    question,
    answer,
  },
});
