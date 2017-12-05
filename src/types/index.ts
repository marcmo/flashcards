export type CardStatus = 'correct' | 'incorrect' | 'none';
export interface Card {
  readonly cardId: number;
  readonly question: string;
  readonly answer: string;
}
export interface Deck {
  readonly name: string;
  readonly freshCards: Array<number>;
  readonly correctCards: Array<number>;
  readonly incorrectCards: Array<number>;
  readonly index: number;
}
export interface DeckState {
  readonly allDecks: Array<Deck>;
  readonly currentDeckName?: string;
}
export interface RootState {
  readonly decks: DeckState;
  readonly cardSet: Array<Card>;
}
