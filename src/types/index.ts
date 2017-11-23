export interface Card {
  readonly question: string;
  readonly answer: string;
}
export interface Deck {
  readonly name: string;
  readonly cards: Array<Card>;
}
export interface DeckState {
  readonly allDecks: Array<Deck>;
}
export interface RootState {
  readonly decks: DeckState;
}
