import { log } from '../lib/Logging';
import * as T from '../types';
export enum CardActionType {
  CREATE_CARD = 'CREATE_CARD',
}
export type CardAction =
  CreateCard;
export interface CreateCard {
  type: CardActionType.CREATE_CARD;
  payload: {
    cardId: number;
    deckName: string;
    question: string;
    answer: string;
  };
}
export const createCreateCardAction = (
  deckName: string,
  cardId: number,
  question: string,
  answer: string): CreateCard  => ({
  type: CardActionType.CREATE_CARD,
  payload: {
    deckName,
    cardId,
    question,
    answer,
  },
});

export enum DeckActionType {
  ADD_DECK = 'ADD_DECK',
  ADD_CARD = 'ADD_CARD',
  CHANGE_DECK = 'CHANGE_DECK',
  UPDATE_DECK_INDEX = 'UPDATE_DECK_INDEX',
  UPDATE_CARD = 'UPDATE_CARD',
  MARK_DONE = 'MARK_DONE',
  RESET_DECK = 'RESET_DECK',
}
export interface AddCard {
  type: DeckActionType.ADD_CARD;
  payload: {
    deckName: string;
    cardId: number;
  };
}
export interface ResetDeck {
  type: DeckActionType.RESET_DECK;
  payload: {
    deckName: string;
  };
}
export interface UpdateDeckIndex {
  type: DeckActionType.UPDATE_DECK_INDEX;
  payload: {
    deckName: string;
    index: number;
  };
}
export interface MarkDone {
  type: DeckActionType.MARK_DONE;
  payload: {
    deckName: string;
    cardId: number;
    correct: boolean;
  };
}
export interface UpdateCard {
  type: DeckActionType.UPDATE_CARD;
  payload: {
    deckName: string;
    cardName: string;
    cardStatus: T.CardStatus;
  };
}
export interface AddDeck {
  type: DeckActionType.ADD_DECK;
  payload: {
    name: string;
  };
}
export interface ChangeDeck {
  type: DeckActionType.CHANGE_DECK;
  payload: {
    deckName: string;
  };
}
export type DeckAction =
  ChangeDeck |
  UpdateDeckIndex |
  ResetDeck |
  UpdateCard |
  MarkDone |
  AddCard |
  AddDeck;

export const createMarkDoneAction = (deckName: string, cardId: number, correct: boolean): MarkDone => ({
  type: DeckActionType.MARK_DONE,
  payload: {
    deckName,
    cardId,
    correct,
  },
});
export const createUpdateCardAction = (deckName: string, cardName: string, cardStatus: T.CardStatus): UpdateCard => ({
  type: DeckActionType.UPDATE_CARD,
  payload: {
    deckName,
    cardName,
    cardStatus,
  },
});
export const createResetDeckAction = (deckName: string): ResetDeck => ({
  type: DeckActionType.RESET_DECK,
  payload: {
    deckName,
  },
});
export const createUpdateDeckIndexAction = (deckName: string, index: number): UpdateDeckIndex => ({
  type: DeckActionType.UPDATE_DECK_INDEX,
  payload: {
    deckName,
    index,
  },
});
export const createChangeDeckAction = (deckName: string): ChangeDeck => ({
  type: DeckActionType.CHANGE_DECK,
  payload: {
    deckName,
  },
});
export const createAddDeckAction = (name: string): AddDeck => ({
  type: DeckActionType.ADD_DECK,
  payload: {
    name,
  },
});
export const createAddCardAction = (deckName: string, cardId: number): AddCard => ({
  type: DeckActionType.ADD_CARD,
  payload: {
    deckName,
    cardId,
  },
});
