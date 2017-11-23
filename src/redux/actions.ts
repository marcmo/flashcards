import { log } from '../lib/Logging';
export enum DeckActionType {
  ADD_DECK = 'ADD_DECK',
}
export interface AddDeck {
  type: DeckActionType.ADD_DECK;
  payload: {
    name: string;
  };
}
export type DeckAction =
  AddDeck;

export const addDeck = (name: string): AddDeck => ({
  type: DeckActionType.ADD_DECK,
  payload: {
    name,
  },
});
